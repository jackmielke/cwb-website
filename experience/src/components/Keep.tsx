import { useEffect, useRef } from 'react'
import { LIVE, STATS, TIERS } from '../lib/content'
import { gsap } from '../lib/scroll'
import { WaterButton } from './WaterButton'

// International maritime signal flags, one per membership letter.
const FLAGS: Record<string, JSX.Element> = {
  S: (
    <>
      <rect width="60" height="40" fill="#f3eee4" />
      <rect x="20" y="13" width="20" height="14" fill="#1f4f8a" />
    </>
  ),
  I: (
    <>
      <rect width="60" height="40" fill="#e9b93b" />
      <circle cx="30" cy="20" r="10" fill="#13212b" />
    </>
  ),
  D: (
    <>
      <rect width="60" height="40" fill="#e9b93b" />
      <rect y="10" width="60" height="20" fill="#1f4f8a" />
    </>
  ),
  F: (
    <>
      <rect width="60" height="40" fill="#f3eee4" />
      <path d="M30 2 L58 20 L30 38 L2 20 Z" fill="#c23a2b" />
    </>
  ),
  K: (
    <>
      <rect width="30" height="40" fill="#e9b93b" />
      <rect x="30" width="30" height="40" fill="#1f4f8a" />
    </>
  ),
}

const SLICES = 10

function Flag({ letter }: { letter: string }) {
  return (
    <span className="flag" aria-hidden="true">
      {Array.from({ length: SLICES }, (_, i) => (
        <span className="flag-slice" key={i} style={{ ['--k' as string]: i }}>
          <svg viewBox="0 0 60 40" style={{ left: `${-i * 100}%` }}>
            {FLAGS[letter]}
          </svg>
        </span>
      ))}
    </span>
  )
}

export function Keep() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.stat-v').forEach((el) => {
        const target = Number(el.dataset.v)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString('en-US')),
        })
      })
      gsap.from('.tier', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.tiers', start: 'top 82%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section keep" id="keep" ref={root}>
      <div className="stats">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <span className="display stat-num">
              <span className="stat-v" data-v={s.value}>
                0
              </span>
              {s.suffix}
            </span>
            <span className="stat-l">{s.label}</span>
          </div>
        ))}
        <p className="eyebrow stats-src">One year on the water, from the 2022 annual report</p>
      </div>

      <div className="section-head keep-head">
        <p className="eyebrow">The 50th season · Join the crew</p>
        <div>
          <h2 className="display">
            Keep it <em>afloat.</em>
          </h2>
          <p>
            More than half of what keeps CWB running comes from people who simply believe in it. Members sail for
            less, and every membership keeps the front door free for everyone else.
          </p>
        </div>
      </div>

      <ul className="tiers">
        {TIERS.map((t) => (
          <li className="tier" key={t.name}>
            <a href={LIVE.membership} target="_blank" rel="noreferrer" data-cursor="Join">
              <span className="tier-halyard" aria-hidden="true" />
              <Flag letter={t.flag} />
              <span className="eyebrow tier-letter">Flag {t.flag}</span>
              <span className="tier-name display">{t.name}</span>
              <span className="tier-price">
                <b className="display">${t.price}</b> / year
              </span>
              <span className="tier-perk">{t.perk}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="campaign">
        <div className="campaign-copy">
          <p className="eyebrow">Fiftieth season campaign</p>
          <p className="display campaign-line">
            $850,000 to carry the fleet into its next fifty years. <em>Stretch goal: a million.</em>
          </p>
        </div>
        <div className="campaign-ctas">
          <WaterButton href="route:donate" variant="solid">
            Give to the 50th
          </WaterButton>
          <WaterButton href={LIVE.volunteer} variant="dark" external arrow={false}>
            Volunteer
          </WaterButton>
        </div>
      </div>
    </section>
  )
}
