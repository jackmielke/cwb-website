import { useEffect, useRef } from 'react'
import { FLEET } from '../lib/content'
import { gsap } from '../lib/scroll'
import { BoatDrawing } from './BoatDrawing'

export function Fleet() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const t = track.current!
      const dist = () => t.scrollWidth - window.innerWidth
      const tween = gsap.to(t, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => '+=' + dist(),
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
      gsap.to('.fleet-progress i', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: () => '+=' + dist(), scrub: true },
      })
      // cards drift in with a gentle roll as they enter
      gsap.utils.toArray<HTMLElement>('.boat-card').forEach((card) => {
        gsap.from(card.querySelector('.boat-figure'), {
          rotate: -4,
          y: 30,
          opacity: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: 'left 95%',
            end: 'left 55%',
            scrub: true,
          },
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="fleet" id="fleet" ref={root}>
      <div className="fleet-track" ref={track}>
        <div className="fleet-intro">
          <p className="eyebrow">The registry · 170+ vessels</p>
          <h2 className="display">
            Every boat
            <br />
            has a <em>name.</em>
          </h2>
          <p>
            Hands on tillers, not hands behind glass. Meet a few members of the collection, and the ones you can take
            out today.
          </p>
          <span className="fleet-scrollhint eyebrow">
            Scroll to sail through
            <svg viewBox="0 0 40 10" aria-hidden="true">
              <path d="M0 5h36M31 1l5 4-5 4" fill="none" stroke="currentColor" />
            </svg>
          </span>
        </div>
        {FLEET.map((b, i) => (
          <article className="boat-card" key={b.name} data-cursor="Take her out">
            <a href={b.href} target="_blank" rel="noreferrer" className="boat-link">
              <header className="boat-head">
                <span className="eyebrow">No. {String(i + 1).padStart(2, '0')}</span>
                <span className="eyebrow">{b.type}</span>
              </header>
              <div className="boat-figure">
                <div className="boat-bob">
                  <BoatDrawing kind={b.kind} />
                </div>
                <div className="boat-water" aria-hidden="true" />
              </div>
              <h3 className="display">{b.name}</h3>
              <p className="boat-note">{b.note}</p>
              <dl className="boat-spec">
                {b.spec.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <footer className="boat-foot">
                <span className="boat-rate">{b.rate}</span>
                <span className="boat-cta wlink">{b.cta}</span>
              </footer>
            </a>
          </article>
        ))}
        <div className="fleet-end">
          <p className="display">
            Rates per hour, member and general. A one-time sailing checkout is required for sailboats. Season passes
            from $350.
          </p>
        </div>
      </div>
      <div className="fleet-progress" aria-hidden="true">
        <i />
      </div>
    </section>
  )
}
