import { useEffect, useMemo, useRef } from 'react'
import { MILESTONES } from '../lib/content'
import { gsap } from '../lib/scroll'

// A lapstrake hull planked one strake per milestone as you scroll.
const W = 1000
const N = MILESTONES.length
const SAMPLES = 64

const xAt = (t: number) => 90 + 820 * t
const sheer = (t: number) => 120 - 34 * Math.pow(t, 2.4) - 12 * Math.pow(1 - t, 2.6)
const keel = (t: number) => sheer(t) + 150 * Math.pow(Math.sin(Math.PI * Math.pow(t, 0.86)), 0.36)
const band = (j: number, t: number) => {
  const k = keel(t)
  const s = sheer(t)
  // planks run a touch wider amidships, like the real thing
  const f = j / N
  return k + (s - k) * (f + 0.04 * Math.sin(Math.PI * f) * Math.sin(Math.PI * t))
}

function strakePath(j: number) {
  const top: string[] = []
  const bottom: string[] = []
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES
    bottom.push(`${xAt(t).toFixed(1)},${band(j, t).toFixed(1)}`)
    top.push(`${xAt(t).toFixed(1)},${band(j + 1, t).toFixed(1)}`)
  }
  return `M${bottom.join(' L')} L${top.reverse().join(' L')} Z`
}

function curvePath(fn: (t: number) => number, a = 0, b = 1) {
  const pts: string[] = []
  for (let i = 0; i <= SAMPLES; i++) {
    const t = a + ((b - a) * i) / SAMPLES
    pts.push(`${xAt(t).toFixed(1)},${fn(t).toFixed(1)}`)
  }
  return 'M' + pts.join(' L')
}

const WOODS = ['#b9784a', '#a96a3f', '#c08452', '#ad6f43', '#bd7d4d', '#a66639', '#c58b59', '#b07246', '#c98f5c']

export function FiftySeasons() {
  const root = useRef<HTMLElement>(null)
  const strakes = useMemo(() => MILESTONES.map((_, j) => strakePath(j)), [])
  const laps = useMemo(() => MILESTONES.map((_, j) => curvePath((t) => band(j + 1, t), 0.015, 0.985)), [])
  const rivets = useMemo(
    () =>
      MILESTONES.map((_, j) =>
        Array.from({ length: 22 }, (_, i) => {
          const t = 0.06 + (i / 21) * 0.88
          return [xAt(t), band(j + 1, t) + 3] as const
        }),
      ),
    [],
  )
  const molds = useMemo(() => [0.12, 0.24, 0.36, 0.48, 0.6, 0.72, 0.84].map((t) => [xAt(t), sheer(t) - 16, keel(t) + 6]), [])

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => '+=' + window.innerHeight * N * 0.6,
          pin: true,
          scrub: 0.7,
        },
      })
      tl.from('.fs-backbone', { strokeDashoffset: 1, duration: 0.6, ease: 'none' })
      MILESTONES.forEach((_, i) => {
        const at = 0.4 + i
        tl.fromTo(
          `.fs-strake-${i}`,
          { clipPath: 'inset(0% 100% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power1.inOut' },
          at,
        )
        tl.fromTo(`.fs-lap-${i}`, { opacity: 0 }, { opacity: 1, duration: 0.3 }, at + 0.6)
        if (i > 0) {
          tl.to(`.fs-item-${i - 1}`, { opacity: 0, y: -30, duration: 0.35 }, at - 0.05)
          tl.to(`.fs-year-${i - 1}`, { yPercent: -100, opacity: 0, duration: 0.45, ease: 'power2.in' }, at - 0.05)
          tl.fromTo(`.fs-item-${i}`, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, at + 0.25)
          tl.fromTo(`.fs-year-${i}`, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, at + 0.2)
        }
        tl.to('.fs-count b', { innerText: i + 1, snap: { innerText: 1 }, duration: 0.01 }, at + 0.4)
      })
      tl.to('.fs-wl', { strokeDashoffset: 0, duration: 0.8, ease: 'none' }, N + 0.2)
      tl.to({}, { duration: 0.4 })
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="seasons" id="seasons" ref={root}>
      <div className="fs-grid">
        <div className="fs-head">
          <p className="eyebrow">Fifty seasons · Built plank by plank</p>
          <div className="fs-years display" aria-hidden="true">
            {MILESTONES.map((m, i) => (
              <span key={m.year} className={`fs-year fs-year-${i}`}>
                {m.year}
              </span>
            ))}
          </div>
        </div>
        <div className="fs-items">
          {MILESTONES.map((m, i) => (
            <div key={m.year} className={`fs-item fs-item-${i}`}>
              <h3 className="display">{m.title}</h3>
              <p>{m.body}</p>
            </div>
          ))}
          <p className="fs-count eyebrow">
            Strake <b>1</b> of {N}
          </p>
        </div>
      </div>

      <svg className="fs-hull" viewBox={`0 0 ${W} 300`} aria-label="A wooden hull being planked, one strake per milestone">
        <defs>
          <pattern id="grain" width="120" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 4 C30 2 60 7 120 4 M0 10 C40 12 80 8 120 11" fill="none" stroke="rgba(60,30,10,0.18)" strokeWidth="0.7" />
          </pattern>
        </defs>
        {molds.map(([x, y1, y2], i) => (
          <line key={i} x1={x} y1={y1} x2={x} y2={y2} className="fs-mold" />
        ))}
        <path className="fs-backbone" d={curvePath(keel)} pathLength={1} />
        {strakes.map((d, j) => (
          <g key={j} className={`fs-strake fs-strake-${j}`}>
            <path d={d} fill={WOODS[j % WOODS.length]} />
            <path d={d} fill="url(#grain)" />
          </g>
        ))}
        {laps.map((d, j) => (
          <g key={j} className={`fs-lap fs-lap-${j}`}>
            <path d={d} className="fs-lapline" />
            {rivets[j].map(([x, y], k) => (
              <circle key={k} cx={x} cy={y} r={1.4} className="fs-rivet" />
            ))}
          </g>
        ))}
        <line className="fs-wl" x1="20" x2="980" y1="222" y2="222" pathLength={1} />
        <text x="975" y="216" className="fs-wl-label">
          DWL
        </text>
      </svg>
    </section>
  )
}
