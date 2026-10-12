import { useEffect, useRef, useState } from 'react'
import { LivingWater } from '../lib/livingWater'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/scroll'
import { compass, describeSky, getConditions, phaseLabel, seattleTime, skyPhase, sunTimes, type Conditions, type SkyPhase } from '../lib/conditions'
import { WaterButton } from './WaterButton'

type Light = 'live' | 'day' | 'golden' | 'dusk' | 'night'

const LINES = ['Take it out', 'on the water.']

export function Hero({ started }: { started: boolean }) {
  const section = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const water = useRef<LivingWater | null>(null)
  const [fallback, setFallback] = useState(false)
  const [cond, setCond] = useState<Conditions | null>(null)
  const [light, setLight] = useState<Light>('live')

  // Boot the WebGL lake
  useEffect(() => {
    if (!canvas.current) return
    let lw: LivingWater
    try {
      lw = new LivingWater(canvas.current, {
        image: 'img/hero.jpg',
        mask: 'img/hero-water-mask.png',
        imageAspect: 1.5,
        horizon: 0.4,
        focal: window.innerWidth < 760 ? [0.74, 0.5] : [0.5, 0.42],
      })
    } catch {
      setFallback(true)
      return
    }
    water.current = lw
    lw.zoom = prefersReducedMotion ? 1 : 1.16
    if (prefersReducedMotion) lw.still()
    else lw.play()

    const onResize = () => {
      lw.setFocal(window.innerWidth < 760 ? [0.74, 0.5] : [0.5, 0.42])
      lw.resize()
      if (prefersReducedMotion) lw.still()
    }
    window.addEventListener('resize', onResize)

    // Pause when off-screen
    const io = new IntersectionObserver(([e]) => {
      if (prefersReducedMotion) return
      if (e.isIntersecting) lw.play()
      else lw.pause()
    })
    io.observe(canvas.current)

    return () => {
      window.removeEventListener('resize', onResize)
      io.disconnect()
      lw.destroy()
      water.current = null
    }
  }, [])

  // Pointer wake + parallax
  useEffect(() => {
    const el = section.current
    if (!el) return
    let over = false
    const move = (e: PointerEvent) => {
      const lw = water.current
      if (!lw) return
      const onWater = lw.pointer(e.clientX, e.clientY)
      if (onWater !== over) {
        over = onWater
        window.dispatchEvent(new CustomEvent('cursor:water', { detail: onWater }))
      }
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      gsap.to(lw.parallax, { 0: px * 0.012, 1: -py * 0.008, duration: 1.4, ease: 'power3.out', overwrite: true })
    }
    const leave = () => {
      over = false
      window.dispatchEvent(new CustomEvent('cursor:water', { detail: false }))
    }
    const down = (e: PointerEvent) => water.current?.splash(e.clientX, e.clientY)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    el.addEventListener('pointerdown', down)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      el.removeEventListener('pointerdown', down)
    }
  }, [])

  // Intro choreography once the preloader lifts
  useEffect(() => {
    if (!started) return
    const ctx = gsap.context(() => {
      const lw = water.current
      if (lw && !prefersReducedMotion) gsap.to(lw, { zoom: 1.0, duration: 3.2, ease: 'expo.out' })
      gsap.from('.hero-line > span', { yPercent: 115, rotate: 3, duration: 1.4, ease: 'expo.out', stagger: 0.09, delay: 0.1 })
      gsap.from('.hero-fade', { opacity: 0, y: 18, duration: 1.2, ease: 'power3.out', stagger: 0.08, delay: 0.55 })

      // Scroll away: the camera pulls back and the copy drifts up
      ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          if (water.current) water.current.zoom = 1 + p * 0.12
        },
      })
      gsap.to('.hero-copy', {
        yPercent: -18,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, section)
    return () => ctx.revert()
  }, [started])

  // Live conditions + time-of-day light
  useEffect(() => {
    getConditions().then(setCond)
  }, [])

  // Live mode follows the real sky over Seattle, re-checked every minute.
  const [phase, setPhase] = useState<SkyPhase>(() => skyPhase())
  const [clock, setClock] = useState(() => seattleTime(new Date()))
  useEffect(() => {
    const tick = () => {
      setPhase(skyPhase())
      setClock(seattleTime(new Date()))
    }
    const id = window.setInterval(tick, 30000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const lw = water.current
    if (!lw) return
    const mode: SkyPhase = light === 'live' ? phase : light
    const target: Record<SkyPhase, [number, number]> = {
      morning: [0.55, 0.15],
      day: [0, 0],
      golden: [0.85, 0],
      dusk: [0.35, 0.85],
      night: [0.1, 1],
    }
    const [golden, dusk] = target[mode]
    gsap.to(lw, { golden, dusk, duration: 1.8, ease: 'power2.inOut' })
  }, [light, phase])

  const sunset = cond?.live ? cond.sunset : sunTimes().sunset
  const wind = cond ? `${compass(cond.windDir)} ${cond.windKn} kn` : '...'
  return (
    <section id="top" className="hero" ref={section} data-cursor-theme="light">
      {fallback ? (
        <img className="hero-media" src="img/hero.jpg" alt="" />
      ) : (
        <canvas className="hero-media" ref={canvas} aria-hidden="true" />
      )}
      <div className="hero-shade" />
      <div className="hero-copy">
        <p className="eyebrow hero-fade">Est. 1976 · A living museum on Lake Union</p>
        <h1 className="display hero-title">
          {LINES.map((l, i) => (
            <span className="line-mask hero-line" key={i}>
              <span>{i === 1 ? <>on <em>the water.</em></> : l}</span>
            </span>
          ))}
        </h1>
        <p className="hero-sub hero-fade">
          170 wooden boats, most of them small enough to sail or row. Admission is always free, and plenty of the
          collection is yours for an afternoon.
        </p>
        <div className="hero-ctas hero-fade">
          <WaterButton href="#fleet" variant="solid">Get on the water</WaterButton>
          <WaterButton href="#free" variant="light" arrow={false}>Plan a free visit</WaterButton>
        </div>
      </div>

      <div className="hero-bar hero-fade">
        <div className="hb-item hb-now" aria-live="polite">
          <span className={`hb-live ${light === 'live' ? 'is-live' : ''}`} />
          {light === 'live' ? (
            <span>
              Live: {phaseLabel[phase]} in Seattle right now · {clock}
            </span>
          ) : (
            <span>
              Previewing {phaseLabel[light]} ·{' '}
              <button className="hb-back" onClick={() => setLight('live')}>
                Back to live
              </button>
            </span>
          )}
        </div>
        <div className="hb-item">{cond ? `${cond.tempF}°F · ${describeSky(cond.code)}` : '...'}</div>
        <div className="hb-item">Wind {wind}</div>
        <div className="hb-item hb-hide-sm">Sunset {seattleTime(sunset)}</div>
        <div className="hb-light" role="group" aria-label="Light">
          {(['live', 'day', 'golden', 'dusk', 'night'] as Light[]).map((l) => (
            <button key={l} className={light === l ? 'is-active' : ''} onClick={() => setLight(l)}>
              {l === 'live' ? 'Live' : l === 'golden' ? 'Golden' : l}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
