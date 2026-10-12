import { useState } from 'react'

// A stylized, not-to-scale chart of the South Lake Union campus on Waterway 4.
const spots = [
  { id: 'wec', x: 520, y: 470, name: 'Wagner Education Center', tag: 'Start here', body: 'The Olson Kundig designed front door, opened 2019. Exhibits, hanging boats, the boatshop window and the Sail Loft upstairs. Sign up for Public Sail out front.' },
  { id: 'livery', x: 560, y: 300, name: 'The Livery', tag: 'Rent a boat', body: 'Check in for classic sailboats, rowboats, canoes and kayaks. A one-time sailing checkout gets you on the water solo.' },
  { id: 'boathouse', x: 400, y: 245, name: 'The Boathouse', tag: 'Landmark, 1989', body: 'A floating, landmarked gallery with hardwood floors and a north deck looking straight up Lake Union. Also an event space for up to 60.' },
  { id: 'shop', x: 690, y: 255, name: 'Floating Boatshop', tag: 'Free peapod rows', body: 'A rebuilt early-1900s houseboat where boatwrights work in public view. Walk up for a free one-hour peapod row, once a week.' },
  { id: 'pavilion', x: 470, y: 160, name: 'Pavilion & Oar House', tag: 'Landmark, 1984', body: 'Where the oars, sails and stories live. Part of the floating campus the City of Seattle designated a landmark.' },
  { id: 'pond', x: 260, y: 460, name: 'Model Boat Pond', tag: 'Kids, Free Boating Days', body: 'In Lake Union Park. Kids launch the wooden toy boats they build with us on Free Boating Days.' },
]

export function CampusMap() {
  const [active, setActive] = useState('wec')
  const a = spots.find((s) => s.id === active)!
  return (
    <div className="grid lg:grid-cols-12 gap-10 items-center">
      <div className="lg:col-span-8 relative">
        <svg viewBox="0 0 900 600" className="w-full h-auto rounded-[28px] bg-[#16303d]" role="img" aria-label="Illustrated map of the CWB campus on Lake Union">
          <defs>
            <pattern id="ripples" width="36" height="18" patternUnits="userSpaceOnUse">
              <path d="M0 9 Q9 4 18 9 T36 9" fill="none" stroke="#7FAFAF" strokeOpacity=".16" strokeWidth="1" />
            </pattern>
            <pattern id="planks" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 0h8" stroke="#8A6A45" strokeOpacity=".5" /></pattern>
          </defs>
          <rect width="900" height="600" fill="url(#ripples)" />
          {/* depth contours */}
          {[120, 180, 240].map((r, i) => <ellipse key={r} cx="470" cy="40" rx={r * 2.2} ry={r * .7} fill="none" stroke="#7FAFAF" strokeOpacity={0.12 - i * .03} strokeDasharray="2 6" />)}
          {/* land */}
          <path d="M0 380 C120 370 170 390 220 400 L330 405 C360 404 370 380 380 360 L380 330 L760 330 L760 360 C780 380 820 390 900 385 L900 600 L0 600Z" fill="#E9E1D2" />
          <path d="M0 380 C120 370 170 390 220 400 L330 405 C360 404 370 380 380 360 L380 330 L760 330 L760 360 C780 380 820 390 900 385" fill="none" stroke="#0E1F2A" strokeOpacity=".25" strokeWidth="2" />
          {/* park lawn + pond */}
          <path d="M60 430 C140 420 260 425 360 440 L360 560 L60 560Z" fill="#c9d3b4" opacity=".7" />
          <ellipse cx="260" cy="470" rx="70" ry="28" fill="#7FAFAF" opacity=".8" />
          {/* MOHAI */}
          <rect x="70" y="300" width="150" height="70" rx="6" fill="#d8ccb6" stroke="#0E1F2A" strokeOpacity=".25" />
          <text x="145" y="340" textAnchor="middle" className="font-mono" fontSize="12" fill="#0E1F2A" opacity=".55">MOHAI</text>
          {/* WEC */}
          <rect x="455" y="430" width="140" height="85" rx="4" fill="#3b2a1d" />
          {Array.from({ length: 13 }).map((_, i) => <line key={i} x1={462 + i * 10} y1="436" x2={462 + i * 10} y2="509" stroke="#D9A441" strokeOpacity=".35" />)}
          {/* docks */}
          <path d="M395 330 V195 H740 V330" fill="none" stroke="url(#planks)" strokeWidth="14" />
          <path d="M395 330 V195 H740 V330" fill="none" stroke="#B89770" strokeWidth="10" />
          <path d="M560 195 V120" stroke="#B89770" strokeWidth="10" />
          <path d="M470 195 V150" stroke="#B89770" strokeWidth="10" />
          {/* finger piers with boats */}
          {[420, 450, 480, 510, 600, 630, 660, 690, 720].map((x, i) => (
            <g key={x}>
              <path d={`M${x} 205 V${250 + (i % 2) * 18}`} stroke="#B89770" strokeWidth="4" />
              <path d={`M${x + 10} ${222 + (i % 3) * 6} q5 -14 0 -26 q-5 12 0 26z`} fill={['#F3EEE4', '#AD4E25', '#D9A441', '#F3EEE4'][i % 4]} opacity=".9" />
            </g>
          ))}
          {/* boathouse + shop + pavilion */}
          <rect x="370" y="225" width="60" height="44" rx="3" fill="#6b4a32" stroke="#F3EEE4" strokeOpacity=".4" />
          <path d="M366 227 L400 207 L434 227Z" fill="#4a3324" />
          <rect x="665" y="232" width="56" height="40" rx="3" fill="#6b4a32" stroke="#F3EEE4" strokeOpacity=".4" />
          <rect x="445" y="140" width="52" height="30" rx="3" fill="#6b4a32" stroke="#F3EEE4" strokeOpacity=".4" />
          <rect x="540" y="290" width="40" height="22" rx="3" fill="#8A3A18" />
          {/* compass */}
          <g transform="translate(820 80)" stroke="#F3EEE4" strokeOpacity=".6" fill="none">
            <circle r="28" strokeOpacity=".25" />
            <path d="M0 -34 L6 0 L0 34 L-6 0Z" fill="#F3EEE4" fillOpacity=".15" />
            <text y="-40" textAnchor="middle" fontSize="11" fill="#F3EEE4" stroke="none" className="font-mono">N</text>
          </g>
          <text x="40" y="60" fill="#F3EEE4" opacity=".55" fontSize="12" className="font-mono" letterSpacing="3">LAKE UNION · WATERWAY 4</text>
          <text x="40" y="80" fill="#F3EEE4" opacity=".35" fontSize="10" className="font-mono" letterSpacing="2">NOT TO SCALE</text>
          <text x="620" y="560" fill="#0E1F2A" opacity=".5" fontSize="11" className="font-mono" letterSpacing="2">VALLEY ST</text>
          {/* hotspots */}
          {spots.map((s, i) => (
            <g key={s.id} transform={`translate(${s.x} ${s.y})`} className="cursor-pointer" onClick={() => setActive(s.id)} onMouseEnter={() => setActive(s.id)} role="button" tabIndex={0} aria-label={s.name} onKeyDown={(e) => e.key === 'Enter' && setActive(s.id)}>
              {active === s.id && <circle r="26" fill="#D9A441" opacity=".25"><animate attributeName="r" values="16;30;16" dur="2.4s" repeatCount="indefinite" /></circle>}
              <circle r="15" fill={active === s.id ? '#D9A441' : '#F3EEE4'} stroke="#0E1F2A" strokeWidth="2" />
              <text textAnchor="middle" dy="4.5" fontSize="12" fontWeight="700" fill="#0E1F2A" className="font-mono">{i + 1}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="lg:col-span-4">
        <ol className="space-y-1">
          {spots.map((s, i) => (
            <li key={s.id}>
              <button onClick={() => setActive(s.id)} onMouseEnter={() => setActive(s.id)} className={`w-full text-left flex items-baseline gap-4 py-3 border-b border-paper/10 transition ${active === s.id ? 'text-brass' : 'text-paper/70 hover:text-paper'}`}>
                <span className="font-mono text-xs w-5">{String(i + 1).padStart(2, '0')}</span>
                <span className="display text-2xl">{s.name}</span>
              </button>
            </li>
          ))}
        </ol>
        <div key={a.id} className="mt-8 animate-rise">
          <p className="eyebrow text-brass">{a.tag}</p>
          <p className="mt-3 text-paper/80 leading-relaxed text-lg">{a.body}</p>
        </div>
      </div>
    </div>
  )
}
