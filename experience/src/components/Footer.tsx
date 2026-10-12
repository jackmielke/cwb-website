import { LIVE } from '../lib/content'

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
          </p>
          <a className="wlink" href={LIVE.hours} target="_blank" rel="noreferrer">
            Hours, directions and parking
          </a>
        </div>
        <div>
          <p className="eyebrow ft-h">On the water</p>
          <ul>
            <li><a className="wlink" href={LIVE.rent} target="_blank" rel="noreferrer">Boat rentals</a></li>
            <li><a className="wlink" href={LIVE.adultSailing} target="_blank" rel="noreferrer">Sailing classes</a></li>
            <li><a className="wlink" href={LIVE.youth} target="_blank" rel="noreferrer">Youth programs</a></li>
            <li><a className="wlink" href={LIVE.charters} target="_blank" rel="noreferrer">Charters</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow ft-h">The museum</p>
          <ul>
            <li><a className="wlink" href={LIVE.exhibits} target="_blank" rel="noreferrer">Exhibits</a></li>
            <li><a className="wlink" href={LIVE.history} target="_blank" rel="noreferrer">Our history</a></li>
            <li><a className="wlink" href={LIVE.boatbuilding} target="_blank" rel="noreferrer">Boatbuilding</a></li>
            <li><a className="wlink" href={LIVE.calendar} target="_blank" rel="noreferrer">Calendar</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow ft-h">Letters from the dock</p>
          <form className="ft-news" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" aria-label="Email address" />
            <button type="submit" aria-label="Subscribe">
              <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M2 9h13M10 4l5 5-5 5" />
              </svg>
            </button>
          </form>
          <p className="ft-small">News, classes and the occasional boat for sale.</p>
        </div>
      </div>
      <div className="ft-base">
        <img src="img/cwb-logo.png" alt="The Center for Wooden Boats" width={120} height={43} />
        <span>The Center for Wooden Boats is a 501(c)(3) nonprofit. Admission is always free.</span>
        <span className="ft-proto">Design prototype · October 2026</span>
      </div>
    </footer>
  )
}
