import { HOURS, LIVE, SITEMAP } from '../lib/content'
import { Link } from './Link'

// Dick Wagner's line, reflected in moving water.
export function Footer() {
  const quote = (
    <>
      Today Lake Union,
      <br />
      tomorrow <em>the world.</em>
    </>
  )
  return (
    <footer className="footer" data-cursor-theme="light">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="reflect" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.003 0.06" numOctaves="2" seed="3" result="noise">
            <animate attributeName="baseFrequency" dur="14s" values="0.003 0.06;0.005 0.08;0.003 0.06" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="ft-quote">
        <p className="eyebrow">Dick Wagner, founder</p>
        <p className="display ft-line">{quote}</p>
        <div className="ft-refl-wrap" aria-hidden="true">
          <p className="display ft-line ft-reflection">{quote}</p>
        </div>
      </div>

      <div className="ft-grid">
        <div>
          <p className="eyebrow ft-h">Visit</p>
          <p>
            1010 Valley Street
            <br />
            Lake Union Park, Seattle, WA 98109
            <br />
            <a className="wlink" href={LIVE.phone}>{HOURS.phone}</a>
          </p>
          <p className="ft-small ft-hours">
            {HOURS.days}, {HOURS.open}. Last boat out {HOURS.lastBoat}.
          </p>
          <Link to="route:visit" className="wlink">
            Hours, directions and parking
          </Link>
        </div>
        <div>
          <p className="eyebrow ft-h">On the water</p>
          <ul>
            <li><Link to="route:programs" className="wlink">Rental rates</Link></li>
            <li><Link to="route:programs" className="wlink">Classes and camps</Link></li>
            <li><a className="wlink" href={LIVE.youth} target="_blank" rel="noreferrer">Youth programs</a></li>
            <li><a className="wlink" href={LIVE.charters} target="_blank" rel="noreferrer">Charters</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow ft-h">The museum</p>
          <ul>
            <li><a className="wlink" href={LIVE.exhibits} target="_blank" rel="noreferrer">Exhibits</a></li>
            <li><Link to="route:about" className="wlink">About CWB</Link></li>
            <li><Link to="route:donate" className="wlink">Donate</Link></li>
            <li><Link to="route:calendar" className="wlink">Calendar</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow ft-h">Letters from the dock</p>
          <form
            className="ft-news"
            onSubmit={(e) => {
              e.preventDefault()
              window.open(LIVE.enews, '_blank', 'noopener')
            }}
          >
            <input type="email" placeholder="Your email" aria-label="Email address" />
            <button type="submit" aria-label="Subscribe">
              <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M2 9h13M10 4l5 5-5 5" />
              </svg>
            </button>
          </form>
          <p className="ft-small">News, classes and the occasional boat for sale.</p>
          <div className="ft-social">
            <a className="wlink" href={LIVE.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a className="wlink" href={LIVE.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a className="wlink" href={LIVE.youtube} target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
      </div>

      <nav className="ft-index" aria-label="Everything at CWB">
        <p className="eyebrow ft-h">Everything at CWB</p>
        <div className="ft-index-grid">
          {SITEMAP.map((g) => (
            <div key={g.title}>
              <p className="ft-index-h">{g.title}</p>
              <ul>
                {g.links.map(([l, h]) => (
                  <li key={l}>
                    <a href={h} target="_blank" rel="noreferrer">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
      <div className="ft-base">
        <img src="img/cwb-logo.png" alt="The Center for Wooden Boats" width={120} height={43} />
        <span>The Center for Wooden Boats is a 501(c)(3) nonprofit. Admission is always free.</span>
        <span className="ft-proto">Design prototype · October 2026</span>
      </div>
    </footer>
  )
}
