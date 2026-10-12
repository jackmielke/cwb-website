import { Layout } from '../components/Layout'
import { PageHero, Btn, Eyebrow, Section } from '../components/ui'
import { img } from '../../lib/img'
import { rates, passes, freeDays2026, fleet } from '../data'
import { useStatus, StatusDot } from '../components/StatusPill'
import { R } from '../nav'
import { useState } from 'react'

const steps = [
  { n: '1', t: 'Walk up to the Livery', d: 'Rentals are first-come, first-served. No reservations, just come down to the dock while we are open.' },
  { n: '2', t: 'Pick your boat', d: 'Rowboats, canoes and kayaks need no experience. Sailboats need a one-time CWB sailing checkout.' },
  { n: '3', t: 'Push off', d: 'Life jackets for every age are free. Stay between the Fremont and University bridges and be back 15 minutes before close.' },
]

export default function OnTheWater() {
  const st = useStatus()
  const [member, setMember] = useState(false)
  return (
    <Layout overlay>
      <PageHero eyebrow="On the water" image={img('dinghy-sail.jpg')} title={<>History is better <span className="display-i text-brass">with the wind in it.</span></>} intro="Every boat in our livery is part of the museum collection. Rent one by the hour, row a peapod for free, or let a volunteer skipper take you out on Public Sail.">
        <div className="inline-flex items-center gap-3 rounded-full bg-paper/10 backdrop-blur px-5 py-3 text-sm"><StatusDot state={st.state} /> {st.headline}{st.rentals ? '' : ' · Livery reopens in March'}</div>
      </PageHero>

      <Section className="py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="rounded-[28px] border border-ink/10 p-8 reveal">
              <p className="display text-7xl text-rust leading-none">{s.n}</p>
              <p className="display text-3xl mt-6">{s.t}</p>
              <p className="mt-3 text-ink-3 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pb-24" id="rates">
        <div className="flex flex-wrap items-end justify-between gap-6 reveal">
          <div>
            <Eyebrow className="text-rust">The livery · mid-March through October</Eyebrow>
            <h2 className="display text-[44px] md:text-[64px] leading-[.98] mt-5">Rates, per boat, per hour.</h2>
          </div>
          <div className="inline-flex rounded-full bg-paper-2 p-1.5 text-sm font-semibold" role="group" aria-label="Pricing">
            <button onClick={() => setMember(false)} className={`px-5 h-10 rounded-full transition ${!member ? 'bg-ink text-paper' : ''}`}>General</button>
            <button onClick={() => setMember(true)} className={`px-5 h-10 rounded-full transition ${member ? 'bg-rust text-paper' : ''}`}>Member</button>
          </div>
        </div>
        <div className="mt-10 rounded-[28px] overflow-hidden border border-ink/10 reveal">
          {rates.map((r, i) => (
            <div key={r.cls} className={`grid grid-cols-12 items-center gap-4 px-6 md:px-10 py-6 ${i % 2 ? 'bg-paper-2/50' : ''}`}>
              <div className="col-span-12 md:col-span-4"><p className="display text-2xl md:text-3xl">{r.cls}</p><p className="text-sm text-ink-3 mt-1">{r.who}</p></div>
              <p className="col-span-8 md:col-span-5 text-ink-3 text-sm">{r.note}{r.checkout && <span className="ml-2 inline-block rounded-full bg-brass/25 text-ink px-2.5 py-0.5 text-xs font-semibold">Checkout required</span>}</p>
              <p className="col-span-4 md:col-span-3 text-right display text-4xl md:text-5xl">${member ? r.member : r.general}<span className="text-base font-sans text-ink-3">/hr</span></p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-3">One-hour minimum, then prorated in 15-minute steps. Washington sales tax applies to rentals. Members save up to 25%.</p>
      </Section>

      {/* Fleet gallery */}
      <section className="bg-ink text-paper py-24">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <Eyebrow className="text-brass reveal">What you can take out</Eyebrow>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-paper/10 rounded-[28px] overflow-hidden">
            {fleet.map((b) => (
              <div key={b.name} className="bg-ink p-7 reveal">
                <p className="eyebrow text-paper/50">{b.type}</p>
                <p className="display text-3xl mt-3">{b.name}</p>
                <p className="mt-3 text-paper/60 text-sm leading-relaxed">{b.story}</p>
                <p className="mt-5 font-mono text-sm text-brass">{b.specs[1][1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section className="py-24" id="free">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 reveal">
            <Eyebrow className="text-rust">Free, on purpose</Eyebrow>
            <h2 className="display text-[44px] md:text-[64px] leading-[.98] mt-5">Free Boating Days, <span className="display-i text-rust">2026.</span></h2>
            <p className="mt-6 text-lg text-ink-3 leading-relaxed">On these Sundays, volunteer skippers take the public out on everything from sprit boats to steamboats, and kids build toy boats to launch in the park pond. Sign-up starts at 1pm out front of the Wagner Education Center. Rides last about 45 minutes, rain or shine.</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {freeDays2026.map((d) => <span key={d} className="rounded-full border border-ink/15 px-4 py-2 font-mono text-sm">{d}</span>)}
            </div>
            <p className="mt-6 text-sm text-ink-3">Dates for 2027 will be posted in the spring.</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 grid gap-6">
            {[
              ['Public Peapod Program', 'A free one-hour row for up to four people. Walk up to the floating boatshop. One free row per person per week, first come, first served.'],
              ['Sunday Public Sail', 'Four to six boats each Free Boating Day, carrying anywhere from four to twenty passengers. Everyone in your party signs up in person.'],
              ['Toy boatbuilding', 'Kids assemble and decorate a wooden toy boat from 1 to 5pm, then test it in the Lake Union Park model boat pond.'],
              ['Wooden Boat Storytime', 'Sue Kimpton reads in the Boathouse, 2 to 2:45pm, for pre-K through early elementary.'],
            ].map(([t, d]) => (
              <div key={t} className="flex gap-6 border-t border-ink/15 pt-6 reveal">
                <span className="display text-brass text-4xl leading-none">✦</span>
                <div><p className="display text-3xl">{t}</p><p className="mt-2 text-ink-3 leading-relaxed">{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section className="bg-paper-2 py-24">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <div className="grid lg:grid-cols-12 gap-10 items-end reveal">
            <div className="lg:col-span-7"><Eyebrow className="text-rust">Season passes · members only</Eyebrow><h2 className="display text-[44px] md:text-[64px] leading-[.98] mt-5">Sail all year for one price.</h2></div>
            <p className="lg:col-span-5 text-ink-3 text-lg">For people who would live on the lake if they could. Passes run 365 days and cover sail and human-powered boats.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {passes.map((p, i) => (
              <div key={p.name} className={`rounded-[28px] p-8 reveal ${i === 2 ? 'bg-ink text-paper' : 'bg-paper'}`}>
                <p className="eyebrow opacity-60">{p.name}</p>
                <p className="display text-7xl mt-4">${p.price}</p>
                <p className="mt-4 opacity-75 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3"><Btn to={`${R}/join`}>Become a member first</Btn><Btn href="https://www.cwb.org/slu-checkout" variant="ghost">Schedule a sailing checkout</Btn></div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-paper">
        <img src={img('boathouse-deck.jpg')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="relative mx-auto max-w-site px-5 md:px-10 py-28 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7 reveal">
            <Eyebrow className="text-brass">Charter cruises · April to September</Eyebrow>
            <h2 className="display text-[44px] md:text-[72px] leading-[.95] mt-5">Let a captain <span className="display-i text-brass">do the steering.</span></h2>
            <p className="mt-6 text-lg text-paper/80 max-w-xl">Ninety minutes aboard Boat House No. 5, a restored Bill Garden launch, past the skyline, Gas Works Park, the drydocks and the floating homes. Bring a picnic. Well-behaved dogs encouraged.</p>
          </div>
          <div className="lg:col-span-5 reveal">
            <div className="rounded-[28px] bg-paper/10 backdrop-blur p-8">
              <p className="display text-6xl">$280<span className="text-lg font-sans text-paper/60"> members</span></p>
              <p className="display text-3xl text-paper/70 mt-1">$350 general</p>
              <p className="mt-4 text-paper/70">Up to 6 guests, ideally 4. Book at least 24 hours ahead.</p>
              <div className="mt-6"><Btn href="https://app.acuityscheduling.com/schedule.php?owner=29574902&calendarID=12208789" variant="paper">Book a charter</Btn></div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
