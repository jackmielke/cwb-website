import { useEffect, useRef, type ReactNode } from 'react'
import { LIVE } from '../lib/content'
import { gsap } from '../lib/scroll'
import { seattleNow } from '../lib/conditions'
import { Link } from './Link'
import { WaterButton } from './WaterButton'

// Inner pages: the parts of cwb.org the waterfront home doesn't cover.
// Every fact here comes from cwb.org, the 2022 annual report or CWB's Form 990.

function useReveal() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pg-line > span', { yPercent: 115, rotate: 3, duration: 1.3, ease: 'expo.out', stagger: 0.08, delay: 0.15 })
      gsap.from('.pg-fade', { opacity: 0, y: 20, duration: 1.1, ease: 'power3.out', stagger: 0.07, delay: 0.4 })
      gsap.fromTo('.pg-bg', { scale: 1.12 }, { scale: 1, duration: 3, ease: 'expo.out' })
      gsap.utils.toArray<HTMLElement>('.pg-reveal').forEach((el) =>
        gsap.from(el, { y: 50, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }),
      )
    }, root)
    return () => ctx.revert()
  }, [])
  return root
}

function PageHero({ img, pos, eyebrow, lead, em, sub, children }: { img: string; pos?: string; eyebrow: string; lead: string; em: string; sub: ReactNode; children?: ReactNode }) {
  return (
    <section className="pg-hero" data-cursor-theme="light">
      <img className="pg-bg" src={img} alt="" style={{ objectPosition: pos }} />
      <div className="pg-shade" />
      <div className="pg-hero-copy">
        <p className="eyebrow pg-fade">{eyebrow}</p>
        <h1 className="display pg-title">
          <span className="line-mask pg-line">
            <span>{lead}</span>
          </span>
          <span className="line-mask pg-line">
            <span>
              <em>{em}</em>
            </span>
          </span>
        </h1>
        <p className="pg-sub pg-fade">{sub}</p>
        {children && <div className="pg-ctas pg-fade">{children}</div>}
      </div>
    </section>
  )
}

function Head({ eyebrow, title, em, children }: { eyebrow: string; title: string; em: string; children?: ReactNode }) {
  return (
    <div className="section-head pg-reveal">
      <p className="eyebrow">{eyebrow}</p>
      <div>
        <h2 className="display">
          {title} <em>{em}</em>
        </h2>
        {children && <p>{children}</p>}
      </div>
    </div>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M2 9h13M10 4l5 5-5 5" />
    </svg>
  )
}

/* ------------------------------------------------------------------ Visit */

export function Visit() {
  const root = useReveal()
  return (
    <main className="page" ref={root}>
      <PageHero
        img="img/aerial.webp"
        eyebrow="Visit · Admission is always free"
        lead="Come down to"
        em="the water."
        sub="A small wooden waterfront at the south end of Lake Union, in the middle of the city. Walk the docks, climb aboard, and take something out."
      >
        <WaterButton href="#where" variant="light">Directions</WaterButton>
        <WaterButton href="route:calendar" variant="light" arrow={false}>What's on</WaterButton>
      </PageHero>

      <section className="section pg-where" id="where">
        <div className="pg-split">
          <div className="pg-reveal">
            <p className="eyebrow">Where</p>
            <p className="display pg-big">1010 Valley Street</p>
            <p>Lake Union Park, Seattle, WA 98109. On Waterway 4, next to MOHAI, at the foot of South Lake Union.</p>
            <dl className="pg-dl">
              <div>
                <dt className="eyebrow">Streetcar</dt>
                <dd>South Lake Union line to the Lake Union Park stop, then a short walk to the docks.</dd>
              </div>
              <div>
                <dt className="eyebrow">Parking</dt>
                <dd>Paid street parking and nearby garages. It fills up on summer weekends.</dd>
              </div>
              <div>
                <dt className="eyebrow">By water</dt>
                <dd>Paddle in. It's a living museum, after all.</dd>
              </div>
              <div>
                <dt className="eyebrow">Access</dt>
                <dd>The docks float and move with the lake. Ask the dock crew and they'll help you aboard.</dd>
              </div>
            </dl>
            <a className="wlink" href="https://www.google.com/maps/dir/?api=1&destination=1010+Valley+St,+Seattle,+WA+98109" target="_blank" rel="noreferrer">
              Open in Maps
            </a>
          </div>
          <div className="pg-map pg-reveal">
            <iframe
              title="Map of The Center for Wooden Boats on Lake Union"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-122.3445%2C47.6232%2C-122.3295%2C47.6318&layer=mapnik&marker=47.6275%2C-122.3370"
            />
            <span className="pg-map-pin eyebrow">CWB · 47.6275° N, 122.337° W</span>
          </div>
        </div>
      </section>

      <section className="section pg-hours">
        <Head eyebrow="When" title="Open with" em="the seasons.">
          The boats come out mid-March and go back under cover after October. Hours shift with the light, so check
          today's before you come.
        </Head>
        <div className="pg-cards pg-cards--3">
          <article className="pg-card pg-reveal">
            <p className="eyebrow">Spring to fall</p>
            <p className="display pg-card-t">Livery open</p>
            <p>Rentals, Peapod rows and classes, mid-March through October, Wednesday to Sunday.</p>
          </article>
          <article className="pg-card pg-reveal">
            <p className="eyebrow">Winter</p>
            <p className="display pg-card-t">Docks quiet</p>
            <p>The museum stays open and closes to the public at 4 PM. The boatshop keeps working.</p>
          </article>
          <article className="pg-card pg-reveal">
            <p className="eyebrow">Today</p>
            <p className="display pg-card-t">Check the dock</p>
            <p>Weather and wind decide what goes out. The live conditions on the home page say what it's like now.</p>
            <Link to="#conditions" className="wlink">See conditions</Link>
          </article>
        </div>
      </section>

      <section className="section pg-free">
        <Head eyebrow="Free, every time" title="The front door" em="is free." />
        <ul className="pg-rows">
          {[
            ['The museum', 'Walk the docks, the Boat Hall and the boatshop. No ticket, ever.', LIVE.exhibits],
            ['A free Peapod row', 'One hour, once a week, walk-up. No experience needed.', LIVE.freePrograms],
            ['Public Sail', 'The last Sunday of the month. A skipper takes you out, free.', LIVE.publicSail],
            ['Kids build a boat', 'Over 3,000 kids built a toy boat here in one year.', LIVE.freePrograms],
          ].map(([t, d, h], i) => (
            <li key={t} className="pg-reveal">
              <Link to={h} cursor="Open">
                <span className="eyebrow">0{i + 1}</span>
                <span className="display pg-row-t">{t}</span>
                <span className="pg-row-d">{d}</span>
                <Arrow />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section pg-places">
        <Head eyebrow="More than one dock" title="Other" em="harbors." />
        <div className="pg-cards pg-cards--3">
          <article className="pg-card pg-reveal">
            <p className="eyebrow">Northlake</p>
            <p className="display pg-card-t">The workshop</p>
            <p>A workshop and warehouse near Gas Works Park, run in partnership with King County Metro.</p>
          </article>
          <article className="pg-card pg-reveal">
            <p className="eyebrow">Gift shop</p>
            <p className="display pg-card-t">Shop and CWB Handmade</p>
            <p>Pick up something to remember the docks by. Every sale goes back to the fleet.</p>
          </article>
          <article className="pg-card pg-reveal">
            <p className="eyebrow">Boats for sale</p>
            <p className="display pg-card-t">Take one home</p>
            <p>Donated boats that don't join the fleet find new owners, and the sale keeps the rest afloat.</p>
            <Link to={LIVE.boatsForSale} className="wlink">See boats for sale</Link>
          </article>
        </div>
      </section>
    </main>
  )
}

/* --------------------------------------------------------------- Programs */

const PROGRAMS = [
  { tag: 'Adults', t: 'Learn to sail', d: 'From first tiller to your sailing checkout, in the Knockabouts built on this lake.', h: LIVE.adultSailing, img: 'img/sailing.webp' },
  { tag: 'Youth', t: 'Youth sailing and camps', d: 'Summer camps in El Toros and the RS Feva fleet. 2026 was a record summer.', h: LIVE.youth, img: 'img/paddlers.webp' },
  { tag: 'Build', t: 'Boatbuilding classes', d: 'Build your own Chesapeake Light Craft boat with a CWB boatwright beside you.', h: LIVE.boatbuilding, img: 'img/ribs.webp' },
  { tag: 'Race', t: 'Fall Learn to Race', d: 'Starts, marks and tactics on Lake Union once the summer crowds thin out.', h: LIVE.adultSailing, img: 'img/livery-docks.webp' },
  { tag: 'Youth team', t: 'Dragon boat', d: "CWB's youth dragon boat team. Long boat, lots of paddles, one drum.", h: LIVE.youth, img: 'img/boathouse-deck.webp' },
  { tag: 'Safety', t: 'Maritime first aid', d: 'What to do when something goes wrong on the water.', h: LIVE.calendar, img: 'img/boatshop.webp' },
]

const RATES = [
  ['Large sailboat', '$80', '$100'],
  ['Small sailboat', '$45', '$50'],
  ['Rowboat', '$30', '$40'],
  ['Canoe or kayak', '$25', '$35'],
]

const PASSES = [
  ['Small Boat', 350, 'For rowers and small-boat sailors.'],
  ['Weekday', 550, 'For the ones who sneak out midweek.'],
  ['Die Hard', 800, 'For the ones who are always here.'],
] as const

export function Programs() {
  const root = useReveal()
  return (
    <main className="page" ref={root}>
      <PageHero
        img="img/boatshop.webp"
        pos="30% 50%"
        eyebrow="Classes, camps and rentals"
        lead="Learn it on"
        em="the water."
        sub="1,539 sailing students and 103 boatbuilders came through in one year. Most of them had never held a tiller or a plane before."
      >
        <WaterButton href="#classes" variant="light">Find a class</WaterButton>
        <WaterButton href="#rates" variant="light" arrow={false}>Rental rates</WaterButton>
      </PageHero>

      <section className="section" id="classes">
        <Head eyebrow="Classes and camps" title="Something for" em="every hand.">
          Registration and dates live on CWB's booking system. Pick a program to see the next session.
        </Head>
        <div className="pg-programs">
          {PROGRAMS.map((p) => (
            <Link key={p.t} to={p.h} className="pg-prog pg-reveal" cursor="Book">
              <img src={p.img} alt="" loading="lazy" />
              <span className="pg-prog-tide" aria-hidden="true" />
              <span className="pg-prog-copy">
                <span className="eyebrow">{p.tag}</span>
                <span className="display pg-prog-t">{p.t}</span>
                <span className="pg-prog-d">{p.d}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section pg-rates" id="rates">
        <Head eyebrow="Livery · Mid-March to October" title="Rent by" em="the hour.">
          Sailboats need a one-time sailing checkout. Rowboats and paddle craft just need a life jacket. Washington
          sales tax applies to rentals.
        </Head>
        <div className="pg-split">
          <table className="pg-table pg-reveal">
            <thead>
              <tr>
                <th>Per hour</th>
                <th>Member</th>
                <th>General</th>
              </tr>
            </thead>
            <tbody>
              {RATES.map(([b, m, g]) => (
                <tr key={b}>
                  <td className="display">{b}</td>
                  <td>{m}</td>
                  <td>{g}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pg-passes pg-reveal">
            <p className="eyebrow">Season passes · members only</p>
            {PASSES.map(([n, p, d]) => (
              <div className="pg-pass" key={n}>
                <span className="display pg-pass-n">{n}</span>
                <span className="pg-pass-d">{d}</span>
                <b className="display">${p}</b>
              </div>
            ))}
            <div className="pg-ctas">
              <WaterButton href={LIVE.rent} variant="solid" external>
                Reserve a boat
              </WaterButton>
              <WaterButton href={LIVE.membership} variant="dark" external arrow={false}>
                Become a member
              </WaterButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

/* --------------------------------------------------------------- Calendar */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function lastSunday(year: number, month: number) {
  const d = new Date(Date.UTC(year, month + 1, 0))
  d.setUTCDate(d.getUTCDate() - d.getUTCDay())
  return d
}

function nextPublicSail() {
  const { month, day } = seattleNow()
  const year = Number(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', year: 'numeric' }).format(new Date()))
  let ls = lastSunday(year, month - 1)
  if (ls.getUTCDate() < day) ls = lastSunday(month === 12 ? year + 1 : year, month % 12)
  return ls
}

const RHYTHMS = [
  { when: 'Every week', t: 'Free Peapod rows', d: 'One free hour in a Peapod, once a week, walk-up, all season.', h: LIVE.freePrograms },
  { when: 'Every month', t: 'Public Sail', d: 'The last Sunday of the month. Free rides with a CWB skipper.', h: LIVE.publicSail },
  { when: 'Spring', t: 'GiveBIG', d: "Seattle's giving day. The easiest day of the year to keep the fleet afloat.", h: LIVE.donate },
  { when: 'Every year', t: 'Norm Blanchard W.O.O.D. Regatta', d: 'Wooden boats racing on the lake Norm Blanchard built them for.', h: LIVE.calendar },
  { when: 'Every year', t: 'Dinner on the Docks', d: "CWB's big night out, on the docks.", h: LIVE.calendar },
  { when: 'Every year', t: 'Happy Hour 4 Good', d: 'With the Lake Union Rotary, for a good cause on the docks.', h: LIVE.calendar },
  { when: 'Fall', t: 'Learn to Race', d: 'The fall racing series for newer sailors.', h: LIVE.adultSailing },
]

export function Calendar() {
  const root = useReveal()
  const ps = nextPublicSail()
  const { month } = seattleNow()
  const inSeason = month >= 3 && month <= 10
  return (
    <main className="page" ref={root}>
      <PageHero
        img="img/paddlers.webp"
        pos="45% 60%"
        eyebrow="Calendar"
        lead="What's on"
        em="the water."
        sub="The fleet keeps a rhythm: free rows every week, a free sail every month, and a handful of nights a year that everyone in the wooden boat world turns up for."
      >
        <WaterButton href={LIVE.calendar} variant="light" external>
          Full calendar with dates
        </WaterButton>
      </PageHero>

      <section className="section pg-cal">
        <div className="pg-split">
          <div className="pg-next pg-reveal">
            <p className="eyebrow">Next free Public Sail</p>
            <p className="display pg-next-day">
              {ps.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' })}
              <br />
              <em>{ps.toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' })}</em>
            </p>
            <p>The last Sunday of every month. No experience and no cost. Just come down to the docks.</p>
            <Link to={LIVE.publicSail} className="wlink">How Public Sail works</Link>
          </div>
          <div className="pg-season pg-reveal">
            <p className="eyebrow">The livery season {inSeason ? '· open now' : '· back in March'}</p>
            <ol className="pg-months">
              {MONTHS.map((m, i) => (
                <li key={m} className={`${i >= 2 && i <= 9 ? 'is-season' : ''} ${i === month - 1 ? 'is-now' : ''}`}>
                  <span className="pg-month-bar" />
                  <span className="eyebrow">{m}</span>
                </li>
              ))}
            </ol>
            <p>Rentals, Peapod rows and classes run mid-March through October. Winter is for the boatshop.</p>
          </div>
        </div>
      </section>

      <section className="section pg-rhythm">
        <Head eyebrow="The rhythm of a season" title="Every week, every" em="year." />
        <ul className="pg-rows">
          {RHYTHMS.map((r) => (
            <li key={r.t} className="pg-reveal">
              <Link to={r.h} cursor="Open">
                <span className="eyebrow">{r.when}</span>
                <span className="display pg-row-t">{r.t}</span>
                <span className="pg-row-d">{r.d}</span>
                <Arrow />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

/* ------------------------------------------------------------------ About */

const TEAM = [
  ['Josh Anderson', 'Executive Director', 'Came up through the boatshop as CWB’s boatwright before taking the helm in 2020.'],
  ['Corey McDaniel', 'Development Director', 'Members, donors and the fiftieth season campaign.'],
  ['Cheryl Garcia', 'Director of Management', 'Keeps the whole waterfront running.'],
]

const BOOKS = [
  { fy: '2022', rev: 1818982, gifts: 711197, prog: 1043256 },
  { fy: '2023', rev: 1895231, gifts: 960796, prog: 916265 },
  { fy: '2024', rev: 2219851, gifts: 1258224, prog: 850772 },
]

export function About() {
  const root = useReveal()
  const max = Math.max(...BOOKS.map((b) => b.rev))
  const m = (n: number) => `$${(n / 1e6).toFixed(2)}M`
  return (
    <main className="page" ref={root}>
      <PageHero
        img="img/wagner-night.webp"
        eyebrow="About CWB · Since 1976"
        lead="Fifty years on"
        em="the water."
        sub="It started with Dick and Colleen Wagner renting boats from their houseboat in 1968. Today it's 170 wooden boats, a landmarked campus, and a front door that has never charged admission."
      >
        <WaterButton href="#seasons" variant="light">Walk the timeline</WaterButton>
      </PageHero>

      <section className="section">
        <Head eyebrow="The crew" title="Who keeps it" em="afloat.">
          A small staff, a lot of volunteers. 17,134 volunteer hours in one year, logged plank by plank.
        </Head>
        <div className="pg-cards pg-cards--3">
          {TEAM.map(([n, r, d]) => (
            <article className="pg-card pg-person pg-reveal" key={n}>
              <span className="pg-mono display" aria-hidden="true">
                {n
                  .split(' ')
                  .map((w) => w[0])
                  .join('')}
              </span>
              <p className="display pg-card-t">{n}</p>
              <p className="eyebrow">{r}</p>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section pg-campus">
        <Head eyebrow="The campus" title="Buildings that" em="float." />
        <div className="pg-cards pg-cards--3">
          <article className="pg-card pg-reveal">
            <img src="img/boathouse-lanterns.webp" alt="" loading="lazy" />
            <p className="eyebrow">1982 to 1989</p>
            <p className="display pg-card-t">The historic waterfront</p>
            <p>The boat shop, pavilion, oar house and floating Boathouse, nominated as Seattle landmarks in 2021.</p>
          </article>
          <article className="pg-card pg-reveal">
            <img src="img/sail-loft.webp" alt="" loading="lazy" />
            <p className="eyebrow">2019</p>
            <p className="display pg-card-t">The Wagner Education Center</p>
            <p>A $6.5M building by Tom Kundig, with boats hung overhead and doors that open to the lake.</p>
          </article>
          <article className="pg-card pg-reveal">
            <img src="img/wagner-boats.webp" alt="" loading="lazy" />
            <p className="eyebrow">The collection</p>
            <p className="display pg-card-t">170 boats, still in use</p>
            <p>Eight Blanchard Knockabouts built on this lake, plus boats coming home from Cama Beach on Camano Island, quiet since the state closed its cabins in 2024.</p>
          </article>
        </div>
      </section>

      <section className="section pg-books">
        <Head eyebrow="Open books · Form 990" title="Where the money" em="comes from.">
          Nonprofits file their finances publicly every year. In 2024, 57% of CWB's revenue came from gifts and 38%
          from rentals, classes and programs.
        </Head>
        <div className="pg-bars pg-reveal">
          {BOOKS.map((b) => (
            <div className="pg-bar-row" key={b.fy}>
              <span className="eyebrow">FY{b.fy}</span>
              <span className="pg-bar" style={{ width: `${(b.rev / max) * 100}%` }}>
                <span className="pg-bar-gifts" style={{ flex: b.gifts }} />
                <span className="pg-bar-prog" style={{ flex: b.prog }} />
                <span className="pg-bar-other" style={{ flex: Math.max(0, b.rev - b.gifts - b.prog) }} />
              </span>
              <span className="display pg-bar-v">{m(b.rev)}</span>
            </div>
          ))}
          <p className="pg-legend">
            <span><i className="pg-bar-gifts" /> Gifts</span>
            <span><i className="pg-bar-prog" /> Programs and rentals</span>
            <span><i className="pg-bar-other" /> Shop, boat sales and other</span>
          </p>
        </div>
        <div className="pg-ctas pg-reveal">
          <WaterButton href="https://projects.propublica.org/nonprofits/organizations/911061721" variant="dark" external>
            Read the filings
          </WaterButton>
          <WaterButton href={LIVE.history} variant="dark" external arrow={false}>
            Annual reports
          </WaterButton>
        </div>
      </section>
    </main>
  )
}
