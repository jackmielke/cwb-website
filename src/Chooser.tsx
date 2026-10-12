import { Link } from 'react-router-dom'
import { img } from './lib/img'

const changes = [
  ['Lead with doing, not reading', 'Renting a boat, taking a class and visiting for free are the first things you see, each one tap away.'],
  ['One source of truth for hours', 'Today the site shows three different schedules. The new versions compute open or closed live from the published seasonal calendar, closures included.'],
  ['Free programs, up front', 'The free museum, peapod rows and Public Sail bring people in. They get their own section, not a footnote.'],
  ['Fewer, clearer menus', 'Six plain destinations instead of ten menus and forty links. Donate and Join are always in reach.'],
  ['Event rentals as a real revenue line', 'Spaces, capacities, rates and the inquiry form in one place, the way planners shop for venues.'],
]

const cards = [
  { n: '01', k: 'Today', title: 'The current site, rebuilt', body: 'Every page, menu, word and photo from cwb.org, rebuilt on a modern stack. Adds an Event Rentals button and the inquiry form right on the page.', photo: 'boathouse-harbor.jpg', to: '/original', gray: true },
  { n: '02', k: 'Next', title: 'The site, reimagined', body: 'Same content, reorganized around what people come to do: visit, rent, learn, host an event and give. Live hours and a campus map.', photo: 'wec-dusk.jpg', to: '/reimagined' },
  { n: '03', k: 'Bold', title: 'An immersive experience', body: 'A cinematic, scroll-driven site with living water, the fleet up close and the 50th season story.', photo: 'docks-skyline.jpg', href: 'experience/', accent: true },
]

export default function Chooser() {
  return (
    <div className="rx min-h-screen bg-ink text-paper">
      <div className="mx-auto max-w-site px-5 md:px-10 py-10">
        <div className="flex items-center justify-between gap-4">
          <img src={img('cwb-logo.png')} alt="The Center for Wooden Boats" className="h-10" />
          <p className="eyebrow text-paper/50">Website study · October 2026</p>
        </div>
        <h1 className="display mt-16 md:mt-24 text-[44px] md:text-[88px] leading-[.95] max-w-5xl">Three versions of cwb.org</h1>
        <p className="mt-6 max-w-2xl text-lg text-paper/70">The first rebuilds today's site as it is, so it can move to a modern stack without losing anything. The other two show where it could go.</p>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {cards.map((c) => {
            const inner = (
              <>
                <img src={img(c.photo)} alt="" className={`absolute inset-0 h-full w-full object-cover transition duration-[1.2s] group-hover:scale-105 ${c.gray ? 'opacity-60 grayscale group-hover:grayscale-0' : 'opacity-75'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="relative p-7">
                  <p className={`eyebrow ${c.accent ? 'text-brass' : 'text-paper/60'}`}>{c.n} · {c.k}</p>
                  <p className="display text-3xl md:text-[40px] leading-[1] mt-3">{c.title}</p>
                  <p className="mt-3 text-paper/75">{c.body}</p>
                  <p className="mt-5 font-semibold text-brass">Open →</p>
                </div>
              </>
            )
            const cls = 'group relative overflow-hidden rounded-md min-h-[420px] md:min-h-[540px] flex flex-col justify-end bg-ink-2'
            return c.to ? <Link key={c.n} to={c.to} className={cls}>{inner}</Link> : <a key={c.n} href={c.href} className={cls}>{inner}</a>
          })}
        </div>

        <div className="mt-24 grid lg:grid-cols-12 gap-10">
          <p className="lg:col-span-4 eyebrow text-brass">What changes, and why</p>
          <ol className="lg:col-span-8 divide-y divide-paper/10 border-y border-paper/10">
            {changes.map(([t, d], i) => (
              <li key={t} className="py-6 grid grid-cols-12 gap-4">
                <span className="col-span-2 md:col-span-1 text-sm font-bold text-paper/40">0{i + 1}</span>
                <div className="col-span-10 md:col-span-11"><p className="display text-2xl md:text-3xl">{t}</p><p className="mt-2 text-paper/60">{d}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-16 text-xs text-paper/40">Concept prepared for The Center for Wooden Boats. Content and photography from cwb.org. Forms in the concepts do not submit.</p>
      </div>
    </div>
  )
}
