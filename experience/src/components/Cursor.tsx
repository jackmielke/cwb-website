import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/scroll'

// A small dot with a trailing ring. Elements opt in with data-cursor="Label"
// (shows a label) or data-cursor-theme="light" (on dark backgrounds).
// The hero toggles the "water" state while you are over the lake.
export function Cursor() {
  const root = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [light, setLight] = useState(false)
  const [water, setWater] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.body.classList.add('has-cursor')
    const xd = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power3' })
    const yd = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power3' })
    const xr = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' })
    const yr = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' })
    const move = (e: PointerEvent) => {
      xd(e.clientX)
      yd(e.clientY)
      xr(e.clientX)
      yr(e.clientY)
      setHidden(false)
      const t = e.target as HTMLElement | null
      const l = t?.closest<HTMLElement>('[data-cursor]')
      setLabel(l?.dataset.cursor ?? '')
      const th = t?.closest<HTMLElement>('[data-cursor-theme]')
      setLight(th?.dataset.cursorTheme === 'light')
    }
    const leave = () => setHidden(true)
    const onWater = (e: Event) => setWater((e as CustomEvent<boolean>).detail)
    window.addEventListener('pointermove', move)
    document.documentElement.addEventListener('pointerleave', leave)
    window.addEventListener('cursor:water', onWater)
    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
      window.removeEventListener('cursor:water', onWater)
    }
  }, [])

  const cls = ['cursor', label && 'is-label', light && 'is-light', water && !label && 'is-water', hidden && 'is-hidden']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cls} ref={root} aria-hidden="true">
      <div className="cursor-ring" ref={ring}>
        <span>{label}</span>
      </div>
      <div className="cursor-dot" ref={dot} />
    </div>
  )
}
