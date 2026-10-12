import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Btn, Eyebrow, Arrow, Section } from '../components/ui'
import { CampusMap } from '../components/CampusMap'
import { useStatus, StatusDot } from '../components/StatusPill'
import { weekSchedule, sunset } from '../../lib/hours'
import { img } from '../../lib/img'
import { R } from '../nav'
import { fleet } from '../data'

const pillars = [
  { n: '01', verb: 'Use it.', title: 'Get on the water', body: 'Our exhibits float, and you are allowed to take them out. Rent a classic sailboat, row a peapod for free, or crew a volunteer-skippered Public Sail.', img: 'dinghy-sail.jpg', to: `${R}/on-the-water`, cta: 'Rent a boat' },
  { n: '02', verb: 'Build it.', title: 'Learn the craft', body: 'Sailing classes from first tack to racing. Youth camps all summer. Build your own kayak in the boatshop, or a toy boat in an afternoon.', img: 'boat-ribs.jpg', to: `${R}/learn`, cta: 'Find a class' },
  { n: '03', verb: 'Keep it.', title: 'Carry it forward', body: 'Members, volunteers and donors keep 170 wooden boats sailing and the museum free for everyone. Fifty seasons in, the next fifty start now.', img: 'docks-skyline.jpg', to: `${R}/join`, cta: 'Become a member' },
]

const free = [
  { k: 'Free', t: 'Museum, docks and exhibits', d: 'Walk the docks, the Wagner Education Center and the Boathouse any open day. Admission is always free.' },
  { k: '1 hr', t: 'Peapod rows', d: 'Walk up to the floating boatshop for a free one-hour row. Boats hold four. One free row per person, per week.' },
  { k: '1–5', t: 'Public Sail', d: 'Volunteer skippers take you out on Lake Union, no experience needed. Sign-up starts at 1pm out front of the WEC.' },
  { k: 'Kids', t: 'Toy boatbuilding', d: 'Kids build and decorate a wooden toy boat, then launch it in the Lake Union Park pond on Free Boating Days.' },
]

const stats = [
  { v: '119,557', l: 'visitors walked our docks' },
  { v: '8,304', l: 'people rented a boat' },
  { v: '39%', l: 'of them sailed or rowed for free' },
  { v: '17,134', l: 'volunteer hours given' },
  { v: '1,106', l: 'toy boats built by kids' },
]

const timeline = [
  { y: '1957', t: 'A stranger needs help stepping a mast below the Fremont Bridge. Dick Wagner helps. It starts there.' },
  { y: '1968', t: 'Dick and Colleen Wagner rent wooden boats from their houseboat under the Aurora Bridge.' },
  { y: '1976', t: 'The Wagners and their regulars found a living museum: The Center for Wooden Boats.' },
  { y: '1983', t: 'The floating campus opens on Waterway 4, a former industrial slip at the south end of the lake.' },
  { y: '2019', t: 'The Wagner Education Center opens, designed by Tom Kundig of Olson Kundig.' },
  { y: '2021', t: 'Seattle names the floating boatshop, pavilion, oar house and boathouse a city landmark.' },
  { y: '2026', t: 'Our fiftieth season. More than 350 people come home for the reunion.' },
]

export default function Home() {
  const st = useStatus()
  const week = weekSchedule()
  return (
    <Layout overlay>
      {/* HERO */}
      <section className="relative min-h-[100svh] md:min-h-[680px] bg-ink text-paper overflow-hidden grain">
        <img src={img('boathouse-harbor.jpg')} alt="The floating Boathouse and classic wooden boats moored on Lake Union" className="absolute inset-0 h-full w-full object-cover animate-kenburns" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/10 to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
        <div className="relative min-h-[100svh] md:min-h-[680px] mx-auto max-w-site px-5 md:px-10 flex flex-col justify-end pt-36 pb-10 md:pb-14">
          <Eyebrow className="text-brass animate-rise">A living museum · Lake Union, Seattle · Since 1976</Eyebrow>
          <h1 className="display mt-6 text-[54px] leading-[.92] sm:text-[84px] md:text-[112px] lg:text-[132px] max-w-[11ch] animate-rise [animation-delay:.12s]">
            The museum you can <span className="display-i text-brass">take out</span> on the lake.
          </h1>
          <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8 animate-rise [animation-delay:.25s]">
            <p className="max-w-xl text-lg md:text-xl text-paper/85 leading-relaxed">
              170 wooden boats, and most of them are meant to be sailed, rowed and paddled. Admission is always free. The only thing we ask is that you get your hands on a tiller.
            </p>
            <div className="flex flex-wrap gap-3">
              <Btn to={`${R}/visit`} variant="paper">Plan your visit</Btn>
              <Btn to={`${R}/on-the-water`} variant="ghost-light">Get on the water</Btn>
            </div>
          </div>
          {/* live bar */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-paper/15 backdrop-blur-md animate-rise [animation-delay:.4s]">
            <Link to={`${R}/visit`} className="col-span-2 md:col-span-1 bg-ink/40 p-4 md:p-5 hover:bg-ink/60 transition">
              <p className="eyebrow text-paper/50 !text-[10px]">Right now</p>
              <p className="mt-2 flex items-center gap-2.5 font-semibold"><StatusDot state={st.state} /> {st.headline}</p>
              <p className="mt-1 text-sm text-paper/60">{st.detail}</p>
            </Link>
            <div className="bg-ink/40 p-4 md:p-5"><p className="eyebrow text-paper/50 !text-[10px]">Admission</p><p className="mt-2 font-semibold">Always free</p><p className="mt-1 text-sm text-paper/60">Rentals priced by the hour</p></div>
            <div className="bg-ink/40 p-4 md:p-5"><p className="eyebrow text-paper/50 !text-[10px]">Sunset tonight</p><p className="mt-2 font-semibold">{sunset()}</p><p className="mt-1 text-sm text-paper/60">From the Boathouse deck</p></div>
            <a href="https://maps.google.com/?q=1010+Valley+St+Seattle+WA+98109" className="col-span-2 md:col-span-1 bg-ink/40 p-4 md:p-5 hover:bg-ink/60 transition"><p className="eyebrow text-paper/50 !text-[10px]">Find us</p><p className="mt-2 font-semibold">1010 Valley Street</p><p className="mt-1 text-sm text-paper/60">Lake Union Park, next to MOHAI ↗</p></a>
          </div>
        </div>
      </section>

      {/* 50th marquee */}
      <div className="bg-rust text-paper overflow-hidden border-y border-rust-deep">
        <div className="flex w-max animate-marquee py-4">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-10 pr-10 display text-2xl md:text-3xl whitespace-nowrap">
              {['Fifty seasons on Lake Union', '1976 – 2026', 'Today Lake Union, tomorrow the world', '170 wooden boats', 'Admission is always free', 'A Seattle landmark'].map((t) => (
                <span key={t} className="flex items-center gap-10">{t}<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-brass" aria-hidden><path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" /></svg></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* INTRO */}
      <Section className="py-24 md:py-36">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 reveal"><Eyebrow className="text-rust">Why we exist</Eyebrow></div>
          <div className="md:col-span-8">
            <p className="display text-[32px] md:text-[52px] leading-[1.08] reveal">
              Most museums ask you to stand behind the rope. Ours hands you the oars. Since 1976 we have kept the small wooden boats of the Pacific Northwest <span className="display-i text-rust">alive by using them</span>, and taught anyone who walks down the dock how.
            </p>
          </div>
        </div>
      </Section>

      {/* PILLARS */}
      <Section className="pb-24 md:pb-36">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((p, i) => (
            <Link key={p.n} to={p.to} className="group reveal block" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-ink">
                <img src={img(p.img)} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-[1.2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                <div className="absolute top-5 left-6 eyebrow text-paper/70">{p.n}</div>
                <div className="absolute bottom-0 p-7 text-paper">
                  <p className="display-i text-brass text-3xl">{p.verb}</p>
                  <p className="display text-4xl lg:text-5xl mt-1">{p.title}</p>
                </div>
              </div>
              <p className="mt-6 text-ink-3 leading-relaxed text-[17px]">{p.body}</p>
              <p className="mt-4 font-semibold text-rust flex items-center gap-2">{p.cta} <Arrow /></p>
            </Link>
          ))}
        </div>
      </Section>

      {/* FREE */}
      <section className="relative bg-ink text-paper py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 chart-lines" aria-hidden />
        <div className="relative mx-auto max-w-site px-5 md:px-10">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7 reveal">
              <Eyebrow className="text-brass">The free front door</Eyebrow>
              <h2 className="display mt-6 text-[48px] md:text-[80px] leading-[.95]">Everyone gets <span className="display-i text-brass">on the water.</span></h2>
            </div>
            <p className="lg:col-span-5 text-paper/70 text-lg leading-relaxed reveal">
              Two in five people who rowed or sailed with us last counted did it for free. That is on purpose. Maritime heritage should not be something you have to afford.
            </p>
          </div>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-paper/10 rounded-[28px] overflow-hidden">
            {free.map((f, i) => (
              <div key={f.t} className="bg-ink p-8 reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <p className="display text-brass text-6xl">{f.k}</p>
                <p className="mt-6 text-xl font-semibold">{f.t}</p>
                <p className="mt-3 text-paper/60 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4 reveal">
            <Btn to={`${R}/on-the-water#free`} variant="paper">See free programs and dates</Btn>
            <span className="text-paper/50 text-sm">Public Sail and toy boatbuilding run on Free Boating Days, April through September.</span>
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section className="py-24 md:py-36 overflow-hidden">
        <div className="mx-auto max-w-site px-5 md:px-10 flex flex-wrap items-end justify-between gap-6">
          <div className="reveal">
            <Eyebrow className="text-rust">Meet the fleet</Eyebrow>
            <h2 className="display mt-6 text-[44px] md:text-[72px] leading-[.95] max-w-3xl">Every boat has a name, <span className="display-i text-rust">and a story.</span></h2>
          </div>
          <Btn to={`${R}/on-the-water`} variant="ghost" className="reveal">Rates and how to rent</Btn>
        </div>
        <div className="mt-14 flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-5 md:px-[max(2.5rem,calc((100vw_-_1360px)/2_+_2.5rem))] pb-4">
          {fleet.map((b, i) => (
            <article key={b.name} className="snap-start shrink-0 w-[300px] md:w-[360px] rounded-[28px] bg-paper-2 p-7 flex flex-col reveal" style={{ transitionDelay: `${Math.min(i, 4) * 70}ms` }}>
              <div className="flex items-start justify-between">
                <p className="eyebrow text-ink-3">{b.type}</p>
                <p className="font-mono text-xs text-ink-3">{String(i + 1).padStart(2, '0')}</p>
              </div>
              <BoatGlyph kind={b.glyph} />
              <h3 className="display text-4xl mt-2">{b.name}</h3>
              <p className="mt-3 text-ink-3 leading-relaxed flex-1">{b.story}</p>
              <dl className="mt-6 grid grid-cols-2 gap-y-3 text-sm border-t border-ink/10 pt-5">
                {b.specs.map(([k, v]) => (<div key={k}><dt className="eyebrow !text-[10px] text-ink-3">{k}</dt><dd className="mt-1 font-semibold">{v}</dd></div>))}
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* STATS */}
      <Section className="pb-24 md:pb-36">
        <div className="rounded-[36px] bg-paper-2 p-8 md:p-14 reveal">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="display text-3xl md:text-4xl">One year on the docks</p>
            <p className="eyebrow text-ink-3">From CWB's most recent annual report</p>
          </div>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-5 gap-8">
            {stats.map((s) => (
              <div key={s.l} className="border-t border-ink/15 pt-5">
                <p className="display text-[44px] md:text-[56px] leading-none text-rust">{s.v}</p>
                <p className="mt-3 text-ink-3">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* MAP */}
      <section className="bg-ink-2 text-paper py-24 md:py-36">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-7 reveal">
              <Eyebrow className="text-brass">Find your way</Eyebrow>
              <h2 className="display mt-6 text-[44px] md:text-[72px] leading-[.95]">A small wooden harbor in the middle of <span className="display-i text-brass">South Lake Union.</span></h2>
            </div>
            <div className="lg:col-span-5 reveal">
              <div className="rounded-2xl bg-ink/50 p-6">
                <p className="eyebrow text-paper/50">This week</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {week.map((d) => (
                    <li key={d.iso} className={`flex justify-between gap-4 ${d.today ? 'text-brass font-semibold' : 'text-paper/70'}`}>
                      <span className="w-24">{d.name} {d.date}</span>
                      <span className="flex-1 text-right">{d.hours}{d.note && d.hours !== 'Closed' ? ` · ${d.note}` : ''}</span>
                    </li>
                  ))}
                </ul>
                {week.some((d) => d.note && d.hours === 'Closed') && <p className="mt-4 text-xs text-paper/50">Closed for {week.find((d) => d.note && d.hours === 'Closed')!.note}.</p>}
              </div>
            </div>
          </div>
          <CampusMap />
        </div>
      </section>

      {/* MUSEUM */}
      <Section className="py-24 md:py-36">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative reveal">
            <div className="aspect-[4/5] rounded-[28px] overflow-hidden"><img src={img('wec-hanging-boats.jpg')} alt="Wooden boats hanging from the rafters of the Wagner Education Center" className="h-full w-full object-cover" /></div>
            <div className="absolute -bottom-8 -right-4 md:-right-10 w-48 md:w-64 aspect-[3/4] rounded-[22px] overflow-hidden border-8 border-paper shadow-2xl"><img src={img('gallery-hall.jpg')} alt="Visitors walking the gallery hall" className="h-full w-full object-cover" /></div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 reveal">
            <Eyebrow className="text-rust">On view now · Through November 8</Eyebrow>
            <h2 className="display mt-6 text-[44px] md:text-[64px] leading-[.98]">PRIMA Jubilee: <span className="display-i text-rust">A Nautical Celebration</span></h2>
            <p className="mt-6 text-lg text-ink-3 leading-relaxed">Seventeen artists from across the West Coast and Hawaii exhibit their best marine work, hung among the boats in the Wagner Education Center. Feel the awe of Pacific waterways through the eyes of the people who live on them.</p>
            <p className="mt-4 text-ink-3 leading-relaxed">Look up while you are here: boats hang from the rafters, and the boatshop window lets you watch a hull come together plank by plank.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Btn to={`${R}/museum`}>Explore the museum</Btn></div>
          </div>
        </div>
      </Section>

      {/* SPACES */}
      <section className="relative bg-paper-2 py-24 md:py-36 overflow-hidden">
        <div className="mx-auto max-w-site px-5 md:px-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 reveal">
            <Eyebrow className="text-rust">Events &amp; spaces</Eyebrow>
            <h2 className="display mt-6 text-[44px] md:text-[64px] leading-[.98]">Gather where the <span className="display-i text-rust">boats are.</span></h2>
            <p className="mt-6 text-lg text-ink-3 leading-relaxed">Weddings on the docks, dinners in the Sail Loft, holiday parties under paper lanterns in the Boathouse. Every rental supports the museum.</p>
            <dl className="mt-8 grid grid-cols-2 gap-6">
              <div className="border-t border-ink/15 pt-4"><dt className="eyebrow text-ink-3">Sail Loft</dt><dd className="display text-3xl mt-2">100 <span className="text-base font-sans text-ink-3">standing</span></dd></div>
              <div className="border-t border-ink/15 pt-4"><dt className="eyebrow text-ink-3">Boathouse + deck</dt><dd className="display text-3xl mt-2">90 <span className="text-base font-sans text-ink-3">standing</span></dd></div>
            </dl>
            <div className="mt-10"><Btn to={`${R}/spaces`}>Plan an event</Btn></div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 reveal">
            <img src={img('dock-wedding.jpg')} alt="A wedding ceremony on the CWB docks" className="rounded-[22px] aspect-[3/4] object-cover w-full translate-y-10" />
            <div className="grid gap-4">
              <img src={img('boathouse-lanterns.jpg')} alt="The Boathouse lit with paper lanterns for an evening party" className="rounded-[22px] aspect-square object-cover w-full" />
              <img src={img('sail-loft-event.jpg')} alt="The Sail Loft set for a dinner" className="rounded-[22px] aspect-square object-cover w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 md:py-36 overflow-hidden">
        <div className="mx-auto max-w-site px-5 md:px-10 reveal">
          <Eyebrow className="text-rust">Fifty seasons</Eyebrow>
          <h2 className="display mt-6 text-[44px] md:text-[72px] leading-[.95] max-w-4xl">It started with one stranger <span className="display-i text-rust">and a mast.</span></h2>
        </div>
        <div className="mt-16 relative">
          <div className="absolute left-0 right-0 top-[66px] h-px bg-ink/15" />
          <ol className="flex gap-10 overflow-x-auto no-scrollbar snap-x px-5 md:px-[max(2.5rem,calc((100vw_-_1360px)/2_+_2.5rem))] pb-4">
            {timeline.map((t, i) => (
              <li key={t.y} className="snap-start shrink-0 w-[260px] reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <p className="display text-5xl leading-none text-rust">{t.y}</p>
                <span className="block mt-3 h-3 w-3 rounded-full bg-rust ring-4 ring-paper" />
                <p className="mt-5 text-ink-3 leading-relaxed">{t.t}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="mx-auto max-w-site px-5 md:px-10 mt-10"><Btn to={`${R}/story`} variant="ghost">Read our story</Btn></div>
      </section>

      {/* JOIN */}
      <section className="relative overflow-hidden bg-rust text-paper">
        <img src={img('youth-paddle.jpg')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-multiply" />
        <div className="relative mx-auto max-w-site px-5 md:px-10 py-24 md:py-36 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7 reveal">
            <Eyebrow className="text-brass-light">The 50th season campaign</Eyebrow>
            <h2 className="display mt-6 text-[48px] md:text-[88px] leading-[.92]">Keep the museum <span className="display-i text-brass-light">free</span> for the next fifty.</h2>
          </div>
          <div className="lg:col-span-5 reveal">
            <p className="text-lg text-paper/85 leading-relaxed">More than half of what it takes to run CWB comes from people who love it. Members sail for less, get season passes, and keep the docks open to everyone else.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn to={`${R}/join`} variant="paper">Become a member</Btn>
              <Btn to={`${R}/join#give`} variant="ghost-light">Make a gift</Btn>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

function BoatGlyph({ kind }: { kind: 'sloop' | 'cat' | 'row' | 'canoe' | 'launch' }) {
  const common = 'stroke-ink fill-none'
  return (
    <svg viewBox="0 0 200 120" className="my-6 h-28 w-full" aria-hidden>
      <path d="M10 104 Q100 112 190 104" className="stroke-sea/40" fill="none" strokeDasharray="3 5" />
      {kind === 'sloop' && (<><path d="M40 88 L160 88 Q150 100 60 100 Z" className="fill-rust stroke-ink" /><path d="M100 12 V88" className={common} strokeWidth="2" /><path d="M102 16 L150 84 L102 84Z" className="fill-paper stroke-ink" /><path d="M98 24 L58 84 L98 84Z" className="fill-paper stroke-ink" /></>)}
      {kind === 'cat' && (<><path d="M45 88 L155 88 Q148 100 60 100 Z" className="fill-brass stroke-ink" /><path d="M70 14 V88" className={common} strokeWidth="2" /><path d="M72 18 Q130 30 150 84 L72 84Z" className="fill-paper stroke-ink" /></>)}
      {kind === 'row' && (<><path d="M30 86 L170 86 Q160 102 50 102 Z" className="fill-sea stroke-ink" /><path d="M70 80 L30 60 M130 80 L170 60" className={common} strokeWidth="3" strokeLinecap="round" /></>)}
      {kind === 'canoe' && (<><path d="M20 84 Q100 112 180 84 Q100 96 20 84Z" className="fill-rust stroke-ink" /><path d="M90 50 L120 100" className={common} strokeWidth="3" strokeLinecap="round" /></>)}
      {kind === 'launch' && (<><path d="M25 84 L175 84 Q165 102 45 102 Z" className="fill-paper stroke-ink" /><rect x="80" y="58" width="56" height="26" rx="4" className="fill-rust stroke-ink" /><path d="M96 58 V46 H124 V58" className={common} /></>)}
    </svg>
  )
}
