import { useEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { LIVE } from '../lib/content'

gsap.registerPlugin(MotionPathPlugin)

const STOPS = [
  { price: 'Free', when: 'Every open day', title: 'Wander the museum', body: 'The docks, the boathouse and the exhibits. No ticket, no turnstile.', href: LIVE.exhibits },
  { price: 'Free', when: 'Once a week · walk-up', title: 'Row a peapod', body: 'One hour on the lake in a classic double-ender. No experience, no reservation.', href: LIVE.freePrograms },
  { price: 'Free', when: 'Last Sunday, monthly', title: 'Come to Public Sail', body: 'Volunteer skippers take you out. Bring a friend. Bring a jacket.', href: LIVE.publicSail },
  { price: 'From $25', when: 'Mid-March to October', title: 'Take the helm', body: 'Get your one-time checkout, then rent by the hour. Members sail for less.', href: LIVE.rent },
]

const COURSE = 'M20 110 C 160 20, 260 20, 360 80 S 560 150, 660 80 S 860 10, 980 70'

export function FreeDoor() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = () => ({ trigger: '.fd-course', start: 'top 85%', end: 'bottom 30%', scrub: 0.8 })
      const trail = root.current!.querySelector<SVGPathElement>('.fd-trail')!
      const len = trail.getTotalLength()
      gsap.fromTo(
        trail,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: st() },
      )
      gsap.to('.fd-boat', {
        ease: 'none',
        motionPath: { path: COURSE, autoRotate: true },
        scrollTrigger: st(),
      })
      gsap.from('.fd-stop', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.fd-stops', start: 'top 80%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section free" id="free" ref={root}>
      <div className="section-head">
        <p className="eyebrow">Plan a visit · 1010 Valley Street</p>
        <div>
          <h2 className="display">
            Free, <em>honestly.</em>
          </h2>
          <p className="fd-lede">
            Admission has always been free. So is your first hour on the water. Here is the course most people sail,
            from first look to their own afternoon at the helm.
          </p>
        </div>
      </div>
      <svg className="fd-course" viewBox="0 0 1000 160" aria-hidden="true">
        <path className="fd-path" d={COURSE} />
        <path className="fd-trail" d={COURSE} />
        {[20, 360, 660, 980].map((x, i) => (
          <circle key={i} cx={x} cy={[110, 80, 80, 70][i]} r="5" className="fd-wp" />
        ))}
        <g className="fd-boat">
          <path d="M-14 0 C-6 4 6 4 14 0 C11 6 6 8 0 8 C-6 8 -11 6 -14 0 Z" />
          <path d="M1 -1 L1 -22 L-10 -2 Z" className="sail" />
        </g>
      </svg>
      <ol className="fd-stops">
        {STOPS.map((s, i) => (
          <li className="fd-stop" key={s.title}>
            <a href={s.href} target="_blank" rel="noreferrer">
              <span className="eyebrow fd-n">Waypoint {i + 1}</span>
              <span className={`fd-price display ${i === 3 ? 'is-paid' : ''}`}>{s.price}</span>
              <span className="eyebrow fd-when">{s.when}</span>
              <span className="fd-title">{s.title}</span>
              <span className="fd-body">{s.body}</span>
              <span className="wlink fd-more">Details</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
