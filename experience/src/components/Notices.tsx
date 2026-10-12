import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/scroll'
import { HOURS, LIVE, NOTICES } from '../lib/content'

// International Code of Signals flags, drawn at 30 x 20.
const FLAGS: Record<string, JSX.Element> = {
  P: (<><rect width="30" height="20" fill="#1f4e8c" /><rect x="9" y="6" width="12" height="8" fill="#f6f1e6" /></>),
  S: (<><rect width="30" height="20" fill="#f6f1e6" /><rect x="9" y="6" width="12" height="8" fill="#1f4e8c" /></>),
  Y: (<><defs><pattern id="fy" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="6" fill="#e2b33c" /><rect x="3" width="3" height="6" fill="#b8352a" /></pattern></defs><rect width="30" height="20" fill="url(#fy)" /></>),
  N: (<>{Array.from({ length: 16 }, (_, i) => (<rect key={i} x={(i % 4) * 7.5} y={Math.floor(i / 4) * 5} width="7.5" height="5" fill={(i + Math.floor(i / 4)) % 2 ? '#f6f1e6' : '#1f4e8c'} />))}</>),
  R: (<><rect width="30" height="20" fill="#b8352a" /><rect x="12.5" width="5" height="20" fill="#e2b33c" /><rect y="7.5" width="30" height="5" fill="#e2b33c" /></>),
  G: (<>{Array.from({ length: 6 }, (_, i) => (<rect key={i} x={i * 5} width="5" height="20" fill={i % 2 ? '#1f4e8c' : '#e2b33c'} />))}</>),
  B: (<path d="M0 0 H30 L22 10 L30 20 H0 Z" fill="#b8352a" />),
  H: (<><rect width="15" height="20" fill="#f6f1e6" /><rect x="15" width="15" height="20" fill="#b8352a" /></>),
}

function seattleNow() {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date())
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  return { day: get('weekday'), mins: Number(get('hour')) * 60 + Number(get('minute')) }
}

function dockStatus() {
  const { day, mins } = seattleNow()
  const openDay = ['Wed', 'Thu', 'Fri', 'Sat', 'Sun'].includes(day)
  const open = openDay && mins >= 690 && mins < 1140
  const boats = openDay && mins >= 690 && mins < 1050
  if (open && boats) return { open: true, line: 'Open now. Boats are going out.' }
  if (open) return { open: true, line: 'Open now. Last boat is in.' }
  return { open: false, line: openDay && mins < 690 ? 'Opens at 11:30 today.' : 'Closed now. Back Wednesday to Sunday.' }
}

export function Notices() {
  const root = useRef<HTMLElement>(null)
  const [status, setStatus] = useState(dockStatus)

  useEffect(() => {
    const id = window.setInterval(() => setStatus(dockStatus()), 60_000)
    const ctx = gsap.context(() => {
      gsap.from('.nt-row', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: '.nt-list', start: 'top 80%' },
      })
    }, root)
    return () => {
      window.clearInterval(id)
      ctx.revert()
    }
  }, [])

  return (
    <section className="section notices" id="notices" ref={root}>
      <div className="section-head">
        <p className="eyebrow">Notice to mariners</p>
        <div>
          <h2 className="display">
            On the dock <em>this week.</em>
          </h2>
          <p>What is running, what is new and what to sign up for before it fills.</p>
        </div>
      </div>
      <div className="nt-grid">
        <aside className="nt-board" data-cursor-theme="light">
          <p className="eyebrow nt-board-h">Livery & museum hours</p>
          <p className={`nt-status ${status.open ? 'is-open' : ''}`}>
            <i aria-hidden="true" />
            {status.line}
          </p>
          <dl>
            <div><dt>Open</dt><dd>{HOURS.days}</dd></div>
            <div><dt>Hours</dt><dd>{HOURS.open}</dd></div>
            <div><dt>Last boat out</dt><dd>{HOURS.lastBoat}</dd></div>
            <div><dt>Admission</dt><dd>Always free</dd></div>
          </dl>
          <p className="nt-addr">
            1010 Valley Street, Seattle
            <br />
            <a className="wlink" href={LIVE.phone}>{HOURS.phone}</a>
          </p>
          <div className="nt-board-links">
            <a className="wlink" href={LIVE.hours} target="_blank" rel="noreferrer">Directions & parking</a>
            <a className="wlink" href={LIVE.calendar} target="_blank" rel="noreferrer">Full calendar</a>
          </div>
        </aside>
        <ul className="nt-list">
          {NOTICES.map((n) => (
            <li className="nt-row" key={n.title}>
              <a href={n.href} target="_blank" rel="noreferrer" data-cursor="Read">
                <span className="nt-mast" aria-hidden="true">
                  <svg className="nt-flag" viewBox="0 0 30 20">{FLAGS[n.flag]}</svg>
                </span>
                <span className="eyebrow nt-desk">{n.desk}</span>
                <span className="nt-title">{n.title}</span>
                <span className="nt-body">{n.body}</span>
                <span className="eyebrow nt-when">{n.when}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
