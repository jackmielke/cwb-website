import { useEffect, useRef, useState } from 'react'
import { LIVE } from '../lib/content'
import { gsap, goToPage, scrollToTarget } from '../lib/scroll'
import { BoatDrawing } from './BoatDrawing'
import { WaterButton } from './WaterButton'

type Freq = 'once' | 'monthly'

// Impact lines are illustrative until CWB confirms real program costs.
const AMOUNTS: { v: number; once: string; monthly: string }[] = [
  { v: 50, once: 'Oars, life jackets and the small gear that wears out every season.', monthly: 'Keeps a peapod tight, varnished and ready all year.' },
  { v: 100, once: 'Puts a family in a boat on a free Sunday, no checkout needed.', monthly: 'Underwrites a season of free walk-up rows.' },
  { v: 250, once: 'Plank stock and fastenings for a volunteer repair in the boatshop.', monthly: 'Sends a kid through youth sailing who could not otherwise go.' },
  { v: 500, once: 'A week of youth sailing for a kid whose family cannot cover it.', monthly: "Funds a boatwright apprentice's time on the restoration floor." },
  { v: 1000, once: 'Hauls, scrapes and refinishes a Knockabout so she sails another decade.', monthly: 'Becomes a cornerstone of the fiftieth season campaign.' },
]

const FUNDS = ['Where it is needed most', 'The fleet', 'Youth and free programs', 'The boatshop']

const WAYS = [
  { t: 'Become a member', d: 'Sail for less and keep the front door free.', href: '#keep', internal: true },
  { t: 'Donate a wooden boat', d: 'Some join the fleet. Others are sold to fund it.', href: LIVE.boatsForSale },
  { t: 'Give stock or from a DAF', d: 'Appreciated stock and donor advised funds are welcome.', href: LIVE.donate },
  { t: 'Leave a legacy', d: 'Name CWB in your will and keep the fleet sailing after you.', href: LIVE.donate },
  { t: 'Volunteer', d: 'Over 17,000 hours a year, logged plank by plank.', href: LIVE.volunteer },
]

const fmt = (n: number) => `$${n.toLocaleString('en-US')}`

export function Donate() {
  const root = useRef<HTMLElement>(null)
  const [freq, setFreq] = useState<Freq>('once')
  const [amount, setAmount] = useState(100)
  const [other, setOther] = useState('')
  const [fund, setFund] = useState(FUNDS[0])
  const [honor, setHonor] = useState(false)
  const [honoree, setHonoree] = useState('')
  const [sent, setSent] = useState(false)

  const value = other ? Math.max(0, Math.round(Number(other.replace(/[^\d.]/g, '')) || 0)) : amount
  const picked = AMOUNTS.find((a) => a.v === value)
  const impact = picked
    ? picked[freq]
    : value > 0
      ? 'Every dollar goes to keeping wooden boats on the water and the front door free.'
      : 'Choose an amount to see where it goes.'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dn-line > span', { yPercent: 115, rotate: 3, duration: 1.3, ease: 'expo.out', stagger: 0.08, delay: 0.15 })
      gsap.from('.dn-fade', { opacity: 0, y: 20, duration: 1.1, ease: 'power3.out', stagger: 0.07, delay: 0.4 })
      gsap.fromTo('.dn-bg', { scale: 1.12 }, { scale: 1, duration: 3, ease: 'expo.out' })
      gsap.utils.toArray<HTMLElement>('.dn-reveal').forEach((el) =>
        gsap.from(el, { y: 50, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }),
      )
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    gsap.fromTo('.dn-impact-text', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
  }, [impact])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value > 0) setSent(true)
  }

  return (
    <main className="donate" ref={root}>
      <section className="dn-hero" data-cursor-theme="light">
        <img className="dn-bg" src="img/sailing.webp" alt="" />
        <div className="dn-shade" />
        <div className="dn-hero-grid">
          <div className="dn-copy">
            <p className="eyebrow dn-fade">The fiftieth season fund</p>
            <h1 className="display dn-title">
              <span className="line-mask dn-line">
                <span>Keep it on</span>
              </span>
              <span className="line-mask dn-line">
                <span>
                  <em>the water.</em>
                </span>
              </span>
            </h1>
            <p className="dn-sub dn-fade">
              Admission is free, and four in ten people who take out a boat pay nothing. Gifts are why. Fifty years in,
              more than half of what keeps CWB afloat comes from people who simply believe in it.
            </p>
            <div className="dn-goal dn-fade">
              <div className="dn-goal-row">
                <span className="eyebrow">Campaign goal</span>
                <b className="display">$850,000</b>
              </div>
              <div className="dn-goal-row">
                <span className="eyebrow">Stretch</span>
                <b className="display">$1,000,000</b>
              </div>
            </div>
          </div>

          <div className="dn-card dn-fade" data-cursor-theme="dark">
            {!sent ? (
              <form onSubmit={submit}>
                <div className="dn-freq" role="radiogroup" aria-label="Gift frequency">
                  <span className={`dn-freq-pill ${freq === 'monthly' ? 'is-right' : ''}`} aria-hidden="true" />
                  {(['once', 'monthly'] as Freq[]).map((f) => (
                    <button
                      type="button"
                      key={f}
                      role="radio"
                      aria-checked={freq === f}
                      className={freq === f ? 'is-on' : ''}
                      onClick={() => setFreq(f)}
                    >
                      {f === 'once' ? 'One time' : 'Monthly'}
                    </button>
                  ))}
                </div>

                <div className="dn-amounts">
                  {AMOUNTS.map((a) => (
                    <button
                      type="button"
                      key={a.v}
                      className={`dn-amt ${!other && amount === a.v ? 'is-on' : ''}`}
                      onClick={() => {
                        setAmount(a.v)
                        setOther('')
                      }}
                    >
                      <span className="dn-amt-fill" aria-hidden="true" />
                      <span>{fmt(a.v)}</span>
                    </button>
                  ))}
                  <label className={`dn-amt dn-other ${other ? 'is-on' : ''}`}>
                    <span className="dn-amt-fill" aria-hidden="true" />
                    <span className="dn-other-sign">$</span>
                    <input
                      inputMode="numeric"
                      placeholder="Other"
                      value={other}
                      onChange={(e) => setOther(e.target.value.replace(/[^\d]/g, '').slice(0, 7))}
                      aria-label="Other amount"
                    />
                  </label>
                </div>

                <p className="dn-impact" aria-live="polite">
                  <span className="dn-impact-text">{impact}</span>
                </p>

                <fieldset className="dn-funds">
                  <legend className="eyebrow">Direct my gift to</legend>
                  {FUNDS.map((f) => (
                    <label key={f} className={`dn-fund ${fund === f ? 'is-on' : ''}`}>
                      <input type="radio" name="fund" checked={fund === f} onChange={() => setFund(f)} />
                      {f}
                    </label>
                  ))}
                </fieldset>

                <label className="dn-honor">
                  <input type="checkbox" checked={honor} onChange={(e) => setHonor(e.target.checked)} />
                  <span>Give in honor or memory of someone</span>
                </label>
                {honor && (
                  <input
                    className="dn-honoree"
                    placeholder="Their name"
                    value={honoree}
                    onChange={(e) => setHonoree(e.target.value)}
                  />
                )}

                <button type="submit" className="wbtn wbtn--solid dn-submit" disabled={value <= 0}>
                  <span className="wbtn-water" aria-hidden="true">
                    <span />
                  </span>
                  <span>
                    {value > 0 ? `Give ${fmt(value)}${freq === 'monthly' ? ' a month' : ''}` : 'Choose an amount'}
                  </span>
                </button>
                <p className="dn-fine">
                  The Center for Wooden Boats is a 501(c)(3) nonprofit. Gifts are tax deductible as allowed by law.
                </p>
              </form>
            ) : (
              <div className="dn-sent">
                <BoatDrawing kind="knockabout" className="dn-boat" />
                <p className="eyebrow">
                  {fmt(value)}
                  {freq === 'monthly' ? ' a month' : ''} · {fund}
                  {honor && honoree ? ` · In honor of ${honoree}` : ''}
                </p>
                <h2 className="display">
                  Thank you. <em>Fair winds.</em>
                </h2>
                <p>
                  This is a design prototype, so no payment was taken. In the finished site, a secure checkout opens
                  right here without leaving the page. To give today, use CWB's current donation form.
                </p>
                <div className="dn-sent-ctas">
                  <WaterButton href={LIVE.donate} variant="solid" external>
                    Give on cwb.org today
                  </WaterButton>
                  <button type="button" className="wlink" onClick={() => setSent(false)}>
                    Change my gift
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section dn-why">
        <div className="dn-facts">
          <div className="dn-fact dn-reveal">
            <b className="display">57%</b>
            <span>of CWB's revenue in 2024 came from gifts, not tickets or fees.</span>
          </div>
          <div className="dn-fact dn-reveal">
            <b className="display">39%</b>
            <span>of the people who took out a boat in 2022 sailed or rowed for free.</span>
          </div>
          <div className="dn-fact dn-reveal">
            <b className="display">170</b>
            <span>wooden boats, most of them small enough for you to take out.</span>
          </div>
        </div>

        <div className="section-head dn-ways-head dn-reveal">
          <p className="eyebrow">Other ways aboard</p>
          <div>
            <h2 className="display">
              Give in <em>other currents.</em>
            </h2>
          </div>
        </div>
        <ul className="dn-ways">
          {WAYS.map((w, i) => (
            <li key={w.t} className="dn-reveal">
              <a
                href={w.href}
                data-cursor="Open"
                {...(w.internal
                  ? { onClick: (e: React.MouseEvent) => (e.preventDefault(), scrollToTarget(w.href)) }
                  : { target: '_blank', rel: 'noreferrer' })}
              >
                <span className="eyebrow">0{i + 1}</span>
                <span className="display dn-way-t">{w.t}</span>
                <span className="dn-way-d">{w.d}</span>
                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                  <path d="M2 9h13M10 4l5 5-5 5" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
        <p className="dn-back">
          <button type="button" className="wlink" onClick={() => goToPage('home')}>
            Back to the waterfront
          </button>
        </p>
      </section>
    </main>
  )
}
