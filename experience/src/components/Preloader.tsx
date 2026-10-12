import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/scroll'
import { BoatDrawing } from './BoatDrawing'

export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const [year, setYear] = useState(1976)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    document.body.classList.add('is-loading')
    const finish = () => {
      document.body.classList.remove('is-loading')
      setGone(true)
      onDone()
    }
    if (prefersReducedMotion) {
      const t = setTimeout(finish, 300)
      return () => clearTimeout(t)
    }
    const heroImg = new Image()
    heroImg.src = 'img/hero.jpg'
    const loaded = heroImg.decode().catch(() => undefined)
    const counter = { y: 1976 }
    const tl = gsap.timeline({ paused: true })
    tl.to(counter, {
      y: 2026,
      duration: 2.4,
      ease: 'power2.inOut',
      onUpdate: () => setYear(Math.round(counter.y)),
    })
      .to('.pre-meta', { opacity: 0, y: -10, duration: 0.4, stagger: 0.05 }, '+=0.35')
      .to(root.current, { yPercent: -112, duration: 1.25, ease: 'expo.inOut' }, '-=0.1')
      .call(finish, [], '-=0.55')
    const timer = setTimeout(() => loaded.then(() => tl.play()), 120)
    return () => {
      clearTimeout(timer)
      tl.kill()
    }
  }, [onDone])

  if (gone) return null

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="pre-inner">
        <div className="pre-meta pre-top">
          <span className="eyebrow">The Center for Wooden Boats</span>
          <span className="eyebrow">Lake Union · 47.6275° N</span>
        </div>
        <BoatDrawing kind="knockabout" className="pre-drawing" />
        <div className="pre-meta pre-bottom">
          <span className="eyebrow">Lines plan · Blanchard Junior Knockabout</span>
          <span className="pre-year display">{year}</span>
          <span className="eyebrow">Fifty seasons on the water</span>
        </div>
      </div>
      <svg className="pre-wave" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0 0 H1440 V30 C1260 70 1080 70 900 40 C720 10 540 10 360 40 C240 60 120 64 0 50 Z" />
      </svg>
    </div>
  )
}
