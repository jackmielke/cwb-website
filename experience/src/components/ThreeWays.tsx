import { goToPage } from '../lib/scroll'
import { useState } from 'react'
import { LIVE } from '../lib/content'

const WAYS = [
  {
    n: '01',
    verb: 'Use it',
    title: 'Get on the water',
    img: 'img/sailing.webp',
    pos: '32% 70%',
    alt: 'A young sailor in a small wooden sailboat on Lake Union',
    body: 'Rent a rowboat, canoe or sailboat by the hour. Free peapod rows weekly and a free Public Sail on the last Sunday of every month.',
    links: [
      ['Boat rentals', LIVE.rent],
      ['Adult sailing classes', LIVE.adultSailing],
      ['Youth programs & camps', LIVE.youth],
    ],
  },
  {
    n: '02',
    verb: 'Build it',
    title: 'Learn the craft',
    img: 'img/boatshop.webp',
    pos: '30% 50%',
    alt: 'A boatbuilder fairing the planks of a small boat in the CWB shop',
    body: 'Boatbuilding classes, working boatwrights in the shop and kids building toy boats on the docks. Wood sourced in Washington and air-dried.',
    links: [
      ['Boatbuilding classes', LIVE.boatbuilding],
      ['Boats for sale', LIVE.boatsForSale],
      ['Exhibits', LIVE.exhibits],
    ],
  },
  {
    n: '03',
    verb: 'Keep it',
    title: 'Keep it afloat',
    img: 'img/paddlers.webp',
    pos: '45% 60%',
    alt: 'Kids paddling a homemade boat across the water at a CWB event',
    body: 'Members, volunteers and donors keep 170 boats in the water and admission free. Fifty seasons in, this is the year to join the crew.',
    links: [
      ['Become a member', LIVE.membership],
      ['Volunteer', LIVE.volunteer],
      ['Give to the 50th', 'route:donate'],
    ],
  },
]

export function ThreeWays() {
  const [active, setActive] = useState(0)
  return (
    <section className="section ways" id="ways">
      <div className="section-head">
        <p className="eyebrow">Three ways aboard</p>
        <div>
          <h2 className="display">
            Use it. Build it. <em>Keep it.</em>
          </h2>
        </div>
      </div>
      <div className="ways-row">
        {WAYS.map((w, i) => (
          <article
            key={w.n}
            className={`way ${active === i ? 'is-active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            data-cursor-theme="light"
          >
            <img src={w.img} alt={w.alt} loading="lazy" style={{ objectPosition: w.pos }} />
            <div className="way-tide" aria-hidden="true" />
            <div className="way-copy">
              <div className="way-top">
                <span className="eyebrow">{w.n}</span>
                <span className="eyebrow">{w.verb}</span>
              </div>
              <div className="way-bottom">
                <h3 className="display">{w.title}</h3>
                <div className="way-detail">
                  <p>{w.body}</p>
                  <ul>
                    {w.links.map(([l, h]) => (
                      <li key={l}>
                        <a
                          className="wlink"
                          {...(h.startsWith('route:')
                            ? { href: 'donate', onClick: (e: React.MouseEvent) => (e.preventDefault(), goToPage('donate')) }
                            : { href: h, target: '_blank', rel: 'noreferrer' })}
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
