import { useState } from 'react'
import { img } from '../../lib/img'

// The campus, pinned on a real aerial photo of Waterway 4 (looking south toward downtown).
// Pin positions are percentages of the photo.
const spots = [
  { id: 'wec', x: 60, y: 42, name: 'Wagner Education Center', tag: 'Start here', body: 'The big wooden building on the lawn, opened in 2019. Exhibits, boats hanging from the rafters, the boatshop window, and the Sail Loft upstairs. Public Sail sign-up is out front.' },
  { id: 'livery', x: 50, y: 73, name: 'Livery docks', tag: 'Rent a boat', body: 'Check in at the Boathouse for classic sailboats, rowboats, canoes and kayaks. A one-time sailing checkout gets you out solo.' },
  { id: 'boathouse', x: 38, y: 66, name: 'The Boathouse', tag: 'Front desk and gallery', body: 'The floating building on the main dock, dedicated in 1989 and now a Seattle landmark. Gallery inside, a deck looking up the lake, and the event space for up to 90.' },
  { id: 'shop', x: 47.5, y: 54, name: 'Floating Boatshop', tag: 'Free peapod rows', body: 'A rebuilt early-1900s houseboat where boatwrights work in public view. Walk up for a free one-hour peapod row, once a week.' },
  { id: 'park', x: 80, y: 56, name: 'Lake Union Park', tag: 'Free Boating Days', body: 'The lawn and model boat pond next door, where kids launch the toy boats they build with us.' },
  { id: 'mohai', x: 88, y: 80, name: 'MOHAI', tag: 'Our neighbor', body: 'The Museum of History & Industry, in the old Naval Reserve Armory. Parking garages are on the streets just south.' },
]

export function CampusMap() {
  const [active, setActive] = useState('wec')
  const a = spots.find((s) => s.id === active)!
  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <figure className="lg:col-span-8 relative overflow-hidden rounded-md bg-ink">
        <img src={img('aerial-slu.jpg')} alt="Aerial photo of the CWB docks on Lake Union with downtown Seattle behind" className="w-full h-auto block" />
        <div className="absolute inset-0 bg-ink/15" />
        {spots.map((s, i) => (
          <button key={s.id} onClick={() => setActive(s.id)} onMouseEnter={() => setActive(s.id)}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 h-8 w-8 md:h-9 md:w-9 grid place-items-center rounded-full text-[13px] font-bold border-2 shadow-lg transition ${active === s.id ? 'bg-rust text-paper border-paper scale-110' : 'bg-paper text-ink border-ink/20 hover:scale-110'}`}
            aria-label={s.name} aria-pressed={active === s.id}>{i + 1}</button>
        ))}
        <figcaption className="absolute left-3 bottom-3 text-[11px] text-paper/80 bg-ink/60 px-2 py-1 rounded-[3px]">Looking south from Lake Union. Photo: Emil Anderson</figcaption>
      </figure>
      <div className="lg:col-span-4">
        <ol className="space-y-1">
          {spots.map((s, i) => (
            <li key={s.id}>
              <button onClick={() => setActive(s.id)} className={`w-full text-left flex items-baseline gap-3 px-3 py-2.5 rounded-[3px] transition ${active === s.id ? 'bg-paper/10' : 'hover:bg-paper/5'}`}>
                <span className={`text-sm font-bold w-5 ${active === s.id ? 'text-brass' : 'text-paper/50'}`}>{i + 1}</span>
                <span className="font-semibold">{s.name}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-6 border-t border-paper/15 pt-6">
          <p className="eyebrow text-brass">{a.tag}</p>
          <p className="display text-2xl mt-2">{a.name}</p>
          <p className="mt-3 text-paper/70 leading-relaxed">{a.body}</p>
        </div>
      </div>
    </div>
  )
}
