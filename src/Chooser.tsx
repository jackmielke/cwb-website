import { Link } from 'react-router-dom'
import { img } from './lib/img'

const changes = [
  ['One story', 'Lead with what only CWB has: the museum you can take out on the lake. Use it, build it, keep it.'],
  ['One source of truth for hours', 'Today the site shows three different schedules. The redesign computes open or closed live from the published seasonal calendar, closures included.'],
  ['The free front door, up front', 'Free museum, free peapod rows and free Public Sail are the funnel to rentals, members and donors. They get a section, not a footnote.'],
  ['Clear primary actions', 'Six plain-language destinations instead of ten menus and forty links. Donate and Join are always one tap away.'],
  ['Events as a real revenue line', 'Spaces, capacities, 2026 rates and an inquiry form in one place, the way planners actually shop for venues.'],
]

export default function Chooser() {
  return (
    <div className="rx min-h-screen bg-ink text-paper">
      <div className="mx-auto max-w-site px-5 md:px-10 py-10">
        <div className="flex items-center justify-between">
          <img src={img('cwb-logo.png')} alt="The Center for Wooden Boats" className="h-10" />
          <p className="eyebrow text-paper/50">Website study · October 2026</p>
        </div>
        <h1 className="display mt-16 md:mt-24 text-[48px] md:text-[96px] leading-[.95] max-w-5xl">Two versions of <span className="display-i text-brass">cwb.org.</span></h1>
        <p className="mt-6 max-w-2xl text-lg text-paper/70">The first rebuilds today's site as it is, so it can move to a modern stack without losing anything. The second imagines what it could be.</p>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <Link to="/original" className="group relative overflow-hidden rounded-[28px] min-h-[460px] md:min-h-[560px] flex flex-col justify-end bg-ink-2">
            <img src={img('boathouse-harbor.jpg')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-[1.2s]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="relative p-8">
              <p className="eyebrow text-paper/60">01 · Today</p>
              <p className="display text-4xl md:text-6xl mt-3">The current site, rebuilt</p>
              <p className="mt-3 text-paper/70 max-w-md">Same navigation, same pages, same words and photos as cwb.org, in React and Tailwind.</p>
            </div>
          </Link>
          <Link to="/reimagined" className="group relative overflow-hidden rounded-[28px] min-h-[460px] md:min-h-[560px] flex flex-col justify-end bg-rust">
            <img src={img('wec-dusk.jpg')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:scale-105 transition duration-[1.2s]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="relative p-8">
              <p className="eyebrow text-brass">02 · Tomorrow</p>
              <p className="display text-4xl md:text-6xl mt-3">The museum you can <span className="display-i text-brass">take out</span> on the lake</p>
              <p className="mt-3 text-paper/70 max-w-md">A reimagined CWB: live hours, an interactive campus map, the fleet, events and the 50th season.</p>
            </div>
          </Link>
        </div>

        <div className="mt-24 grid lg:grid-cols-12 gap-10">
          <p className="lg:col-span-4 eyebrow text-brass">What changes, and why</p>
          <ol className="lg:col-span-8 divide-y divide-paper/10 border-y border-paper/10">
            {changes.map(([t, d], i) => (
              <li key={t} className="py-6 grid grid-cols-12 gap-4">
                <span className="col-span-2 md:col-span-1 font-mono text-sm text-paper/40">0{i + 1}</span>
                <div className="col-span-10 md:col-span-11"><p className="display text-2xl md:text-3xl">{t}</p><p className="mt-2 text-paper/60">{d}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-16 text-xs text-paper/40">Concept prepared for The Center for Wooden Boats. Content and photography from cwb.org. Forms in the concept do not submit.</p>
      </div>
    </div>
  )
}
