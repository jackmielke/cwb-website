import { useEffect, useRef, useState } from 'react'
import { LIVE, SPACES } from '../lib/content'
import { gsap } from '../lib/scroll'
import { WaterButton } from './WaterButton'

// Hovering a space drops its photograph in like a stone in water:
// the new image opens as a circle from the point you touched.
export function Spaces() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [layers, setLayers] = useState([{ i: 0, key: 0, x: 50, y: 50 }])
  const keyRef = useRef(1)

  const show = (i: number, e?: React.MouseEvent | React.FocusEvent) => {
    if (i === active) return
    setActive(i)
    let x = 30
    let y = 50
    if (e && 'clientX' in e && stage.current) {
      const r = stage.current.getBoundingClientRect()
      x = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100))
      y = Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100))
    }
    const key = keyRef.current++
    setLayers((ls) => [...ls.slice(-2), { i, key, x, y }])
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sp-item', {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.sp-list', start: 'top 80%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const s = SPACES[active]
  return (
    <section className="section spaces" id="spaces" ref={root} data-cursor-theme="light">
      <div className="section-head">
        <p className="eyebrow">Event rentals · Weddings, galas, offsites</p>
        <div>
          <h2 className="display">
            Host it on <em>the water.</em>
          </h2>
          <p>
            Four ways to gather at the south end of Lake Union, with the fleet tied up outside. Every rental supports
            free access to the boats.
          </p>
        </div>
      </div>
      <div className="sp-grid">
        <ol className="sp-list">
          {SPACES.map((sp, i) => (
            <li key={sp.id} className={`sp-item ${i === active ? 'is-active' : ''}`}>
              <button onMouseEnter={(e) => show(i, e)} onFocus={(e) => show(i, e)} onClick={(e) => show(i, e)}>
                <span className="eyebrow sp-n">0{i + 1}</span>
                <span className="display sp-name">{sp.name}</span>
                <span className="eyebrow sp-tag">{sp.tag}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="sp-stage" ref={stage}>
          <div className="sp-images">
            {layers.map((l) => (
              <img
                key={l.key}
                src={SPACES[l.i].img}
                alt={SPACES[l.i].name}
                className="sp-img"
                style={{ ['--x' as string]: l.x + '%', ['--y' as string]: l.y + '%' }}
              />
            ))}
            <span className="sp-badge eyebrow">{s.tag}</span>
          </div>
          <div className="sp-detail" key={s.id}>
            <p>{s.body}</p>
            <dl>
              {s.facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <div className="sp-ctas">
        <WaterButton href={LIVE.inquiry} variant="solid" external>
          Start an inquiry
        </WaterButton>
        <WaterButton href={LIVE.facility} variant="light" external arrow={false}>
          Rates, floor plans and tours
        </WaterButton>
        <p className="sp-note">
          2026 base rates cover five hours, including setup and cleanup. Tours Thursday to Sunday. Inquiries are
          answered by our catering partner, Ravishing Radish.
        </p>
      </div>
    </section>
  )
}
