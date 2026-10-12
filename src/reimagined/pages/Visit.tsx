import { useState } from 'react'
import { Layout } from '../components/Layout'
import { PageHero, Btn, Eyebrow, Section } from '../components/ui'
import { img } from '../../lib/img'
import { seasons, closures, fmt, weekSchedule, sunset } from '../../lib/hours'
import { useStatus, StatusDot } from '../components/StatusPill'
import { CampusMap } from '../components/CampusMap'

const pretty = (iso: string) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })

const faqs = [
  ['Can I just come look at the boats?', 'Yes. Admission is always free and the docks are open to the public whenever we are. Part of the docks may close during youth programs.'],
  ['Where do I park?', 'We have no lot of our own. Try metered street parking along Westlake and south of Valley and Mercer (free after 6pm and on Sundays), or the garages at 500 9th Ave N, 550 Boren and 500 Boren. Please leave Daniel\'s Broiler\'s lot for their diners.'],
  ['Is there accessible parking?', 'Yes, in MOHAI\'s lot next door during business hours. Use the callbox at the gate near CWB for access. It also works as a drop-off point.'],
  ['Can I bring my dog?', 'Yes, on a leash on the docks. Well-behaved dogs can even come out on rentals and charters.'],
  ['Do I need experience to get on the water?', 'Not for rowboats, canoes, kayaks or Public Sail. Sailboats need a one-time CWB sailing checkout.'],
  ['What about Cama Beach?', 'The lower part of Cama Beach State Park has closed, and our programs there are paused. Everything happens at South Lake Union for now.'],
]

export default function Visit() {
  const st = useStatus()
  const week = weekSchedule()
  const [open, setOpen] = useState<number | null>(0)
  const today = new Date().toISOString().slice(0, 10)
  return (
    <Layout overlay>
      <PageHero eyebrow="Plan your visit" image={img('wec-dusk.jpg')} title={<>Come down <span className="display-i text-brass">to the docks.</span></>} intro="We are in Lake Union Park at the south end of the lake, next door to MOHAI. Admission is always free.">
        <div className="inline-flex flex-wrap items-center gap-3 rounded-2xl bg-paper/10 backdrop-blur px-5 py-4">
          <StatusDot state={st.state} /><span className="font-semibold">{st.headline}</span><span className="text-paper/60 text-sm">{st.detail}</span>
        </div>
      </PageHero>

      <Section className="py-24">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 reveal">
            <Eyebrow className="text-rust">The next seven days</Eyebrow>
            <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {week.map((d) => (
                <li key={d.iso} className={`flex items-center justify-between py-4 ${d.today ? 'text-rust' : ''}`}>
                  <span className="flex items-center gap-4"><span className="display text-2xl w-14">{d.name}</span><span className="font-mono text-sm text-ink-3">{d.date}</span>{d.today && <span className="rounded-full bg-rust text-paper px-2 py-0.5 text-xs font-semibold">Today</span>}</span>
                  <span className="text-right"><span className="font-semibold">{d.hours}</span>{d.note && <span className="block text-xs text-ink-3 max-w-[16rem]">{d.hours === 'Closed' ? `Closed for ${d.note}` : d.note}</span>}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink-3">Open Wednesday through Sunday. Last boat out 90 minutes before close. Sunset tonight: {sunset()}.</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 reveal">
            <Eyebrow className="text-rust">2026–27 seasons</Eyebrow>
            <div className="mt-6 grid gap-3">
              {seasons.slice(0, 5).map((s) => {
                const now = today >= s.from && today <= s.to
                return (
                  <div key={s.from} className={`rounded-2xl p-5 flex items-center justify-between gap-4 ${now ? 'bg-ink text-paper' : 'bg-paper-2'}`}>
                    <div><p className="display text-2xl">{s.label}</p><p className={`font-mono text-xs mt-1 ${now ? 'text-paper/60' : 'text-ink-3'}`}>{pretty(s.from)} – {pretty(s.to)}</p></div>
                    <div className="text-right"><p className="font-semibold">{fmt(s.open)}–{fmt(s.close)}</p><p className={`text-xs ${now ? 'text-brass' : 'text-ink-3'}`}>{s.rentals ? 'Museum + livery' : 'Museum only, no rentals'}</p></div>
                  </div>
                )
              })}
            </div>
            <p className="mt-6 eyebrow text-ink-3">Closed</p>
            <ul className="mt-3 flex flex-wrap gap-2">{closures.map((c) => <li key={c.from} className="rounded-full border border-ink/15 px-3 py-1.5 text-sm">{pretty(c.from)}{c.to !== c.from ? `–${pretty(c.to)}` : ''} · {c.reason}</li>)}</ul>
          </div>
        </div>
      </Section>

      <section className="bg-ink-2 text-paper py-24">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <Eyebrow className="text-brass reveal">The campus</Eyebrow>
          <h2 className="display text-[44px] md:text-[64px] leading-[.98] mt-5 mb-14 reveal">Start at the big wooden building.</h2>
          <CampusMap />
        </div>
      </section>

      <Section className="py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ['By transit', 'The South Lake Union Streetcar stops at Lake Union Park, a short walk away. Buses run along Westlake and Fairview.'],
            ['By car', 'Metered street parking nearby is free after 6pm and all day Sunday. Garages on 9th Ave N and Boren Ave run about $7–15.'],
            ['By boat', 'Bring your own boat to an event? Linear moorage on the North Seawall west of MOHAI can be reserved through CWB.'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-[28px] border border-ink/10 p-8 reveal"><p className="display text-3xl">{t}</p><p className="mt-3 text-ink-3 leading-relaxed">{d}</p></div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3"><Btn href="https://maps.google.com/?q=1010+Valley+St+Seattle+WA+98109">Get directions</Btn><Btn href="tel:+12063822628" variant="ghost">(206) 382-2628</Btn></div>
      </Section>

      <section className="bg-paper-2 py-24">
        <div className="mx-auto max-w-site px-5 md:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 reveal"><Eyebrow className="text-rust">FAQ</Eyebrow><h2 className="display text-[40px] md:text-[56px] leading-[1] mt-5">Before you come.</h2></div>
          <div className="lg:col-span-8">
            {faqs.map(([q, a], i) => (
              <div key={q} className="border-b border-ink/15">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between py-6 text-left gap-6" aria-expanded={open === i}>
                  <span className="display text-2xl md:text-3xl">{q}</span><span className={`text-2xl transition ${open === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div className={`grid transition-all duration-500 ${open === i ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'}`}><p className="overflow-hidden text-lg text-ink-3 max-w-2xl">{a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
