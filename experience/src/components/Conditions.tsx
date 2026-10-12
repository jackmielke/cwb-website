import { useEffect, useRef, useState } from 'react'
import { compass, describeSky, getConditions, seattleTime, verdict, type Conditions as C } from '../lib/conditions'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/scroll'
import { LIVE } from '../lib/content'
import { WaterButton } from './WaterButton'

// Wind streaks drawn from the live wind over Lake Union.
function useWindField(canvas: React.RefObject<HTMLCanvasElement>, cond: C | null) {
  useEffect(() => {
    const cv = canvas.current
    if (!cv || !cond) return
    const ctx = cv.getContext('2d')!
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const r = cv.getBoundingClientRect()
      w = r.width
      h = r.height
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    // wind blows FROM windDir, so particles travel toward windDir + 180
    const rad = ((cond.windDir + 180) * Math.PI) / 180
    const base = { x: Math.sin(rad), y: -Math.cos(rad) }
    const speed = 0.6 + Math.min(cond.windKn, 25) * 0.16
    const N = Math.round(Math.min(700, (w * h) / 2200))
    const ps = Array.from({ length: N }, () => ({ x: Math.random() * w, y: Math.random() * h, age: Math.random() * 120 }))
    let raf = 0
    let running = false
    let t = 0
    const frame = () => {
      t += 0.004
      ctx.fillStyle = 'rgba(13, 34, 48, 0.035)'
      ctx.fillRect(0, 0, w, h)
      ctx.strokeStyle = 'rgba(223, 233, 232, 0.32)'
      ctx.lineWidth = 0.8
      ctx.beginPath()
      for (const p of ps) {
        const n = Math.sin(p.x * 0.0035 + t * 2 + Math.cos(p.y * 0.004)) + Math.cos(p.y * 0.0045 - t * 1.5 + Math.sin(p.x * 0.003))
        const a = n * 0.6
        const vx = (base.x * Math.cos(a) - base.y * Math.sin(a)) * speed
        const vy = (base.x * Math.sin(a) + base.y * Math.cos(a)) * speed
        ctx.moveTo(p.x, p.y)
        p.x += vx
        p.y += vy
        ctx.lineTo(p.x, p.y)
        p.age++
        if (p.age > 220 || p.x < -5 || p.x > w + 5 || p.y < -5 || p.y > h + 5) {
          p.x = Math.random() * w
          p.y = Math.random() * h
          p.age = 0
        }
      }
      ctx.stroke()
      raf = requestAnimationFrame(frame)
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running && !prefersReducedMotion) {
        running = true
        raf = requestAnimationFrame(frame)
      } else if (!e.isIntersecting && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    })
    io.observe(cv)
    if (prefersReducedMotion) for (let i = 0; i < 60; i++) frame()
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [canvas, cond])
}

export function Conditions() {
  const root = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const needle = useRef<SVGGElement>(null)
  const [cond, setCond] = useState<C | null>(null)
  useEffect(() => {
    getConditions().then(setCond)
  }, [])
  useWindField(canvas, cond)

  useEffect(() => {
    if (!cond || !needle.current) return
    const ctx = gsap.context(() => {
      gsap.set(needle.current, { rotation: cond.windDir - 160, svgOrigin: '200 200' })
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 70%',
        once: true,
        onEnter: () =>
          gsap.to(needle.current, { rotation: cond.windDir, svgOrigin: '200 200', duration: 2.6, ease: 'elastic.out(1, 0.35)' }),
      })
      gsap.from('.cd-verdict .line-mask > span', {
        yPercent: 110,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: 'top 60%' },
      })
    }, root)
    return () => ctx.revert()
  }, [cond])

  const v = cond ? verdict(cond) : null
  return (
    <section className="conditions" ref={root} data-cursor-theme="light" id="conditions">
      <canvas className="cd-wind" ref={canvas} aria-hidden="true" />
      <div className="cd-inner">
        <div className="cd-copy">
          <p className="eyebrow">
            Is it a sailing day? · {cond?.live ? 'Live from Lake Union' : 'Lake Union'}
          </p>
          <h2 className="display cd-verdict">
            <span className="line-mask">
              <span>{v?.title ?? 'Checking the lake...'}</span>
            </span>
          </h2>
          <p className="cd-body">{v?.body}</p>
          <dl className="cd-data">
            <div>
              <dt>Wind</dt>
              <dd>{cond ? `${cond.windKn} kn ${compass(cond.windDir)}` : '...'}</dd>
            </div>
            <div>
              <dt>Gusts</dt>
              <dd>{cond ? `${cond.gustKn} kn` : '...'}</dd>
            </div>
            <div>
              <dt>Air</dt>
              <dd>{cond ? `${cond.tempF}°F ${describeSky(cond.code).toLowerCase()}` : '...'}</dd>
            </div>
            <div>
              <dt>Sunset</dt>
              <dd>{cond ? seattleTime(cond.sunset) : '...'}</dd>
            </div>
          </dl>
          <div className="cd-ctas">
            <WaterButton href={LIVE.rent} external>Reserve a boat</WaterButton>
            <a className="wlink" href={LIVE.hours} target="_blank" rel="noreferrer">
              Today's hours
            </a>
          </div>
        </div>
        <div className="cd-dial" aria-hidden="true">
          <svg viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="186" className="dial-ring" />
            <circle cx="200" cy="200" r="150" className="dial-ring dial-ring--soft" />
            {Array.from({ length: 72 }, (_, i) => (
              <line
                key={i}
                x1="200"
                y1={i % 9 === 0 ? 14 : 20}
                x2="200"
                y2="30"
                transform={`rotate(${i * 5} 200 200)`}
                className={i % 18 === 0 ? 'tick tick--major' : 'tick'}
              />
            ))}
            {['N', 'E', 'S', 'W'].map((d, i) => (
              <text key={d} x="200" y="62" transform={`rotate(${i * 90} 200 200)`} className="dial-letter">
                {d}
              </text>
            ))}
            <g ref={needle}>
              <path d="M200 44 L212 120 L200 108 L188 120 Z" className="needle" />
              <line x1="200" y1="108" x2="200" y2="200" className="needle-line" />
              <text x="200" y="98" className="needle-label">
                FROM
              </text>
            </g>
            <g className="dial-boat">
              <path d="M180 214 C190 216 210 216 224 210 C220 222 212 228 200 229 C190 229 184 224 180 214 Z" />
              <path d="M202 210 L202 160 L178 208 Z" className="sail" />
            </g>
            <circle cx="200" cy="200" r="3" className="dial-hub" />
          </svg>
          <p className="eyebrow cd-coords">47°37′39″N · 122°20′13″W</p>
        </div>
      </div>
    </section>
  )
}
