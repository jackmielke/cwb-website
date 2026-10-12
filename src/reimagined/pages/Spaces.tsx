import { useState } from 'react'
import { Layout } from '../components/Layout'
import { PageHero, Btn, Eyebrow, Section } from '../components/ui'
import { img } from '../../lib/img'

const spaces = [
  { id: 'loft', name: 'Wagner Sail Loft', where: 'Wagner Education Center, second floor', size: "26' × 44'", seated: 80, standing: 100, img: 'sail-loft-event.jpg', body: 'Where our volunteers cut and repair sails. Cork floors, warm wood walls, steel accents, elevator access, windows over the campus and a balcony looking down into the boatshop.', incl: ['Ten 60" rounds', 'Ten 6\' banquet tables', '103 black folding chairs'] },
  { id: 'boathouse', name: 'Boathouse Gallery + North Deck', where: 'The floating, landmarked Boathouse', size: "28' × 28' + 39' × 32' deck", seated: 63, standing: 90, img: 'boathouse-lanterns.jpg', body: 'Hardwood floors and exposed beams, a historic collection moored all around you, and French doors onto a deck facing straight up Lake Union toward the Space Needle and the seaplanes.', incl: ['Five 60" rounds', 'Eight 6\' banquet tables', '30 white folding chairs', 'Projector and screen'] },
]

const rateRows = [
  { season: 'January–April, October, November', wkend: 2800, wkday: 2300, extra: 325 },
  { season: 'May–September, December', wkend: 3400, wkday: 2900, extra: 375 },
]

const faqs = [
  ['How far ahead can I book?', 'Up to 18 months in advance.'],
  ['Will the public be around?', 'During open hours the docks and livery stay open to everyone. We never close early for an event, and the boats stay put. Consider them guests.'],
  ['Can I bring my own caterer?', 'Yes. Ravishing Radish and Kaspars both know our spaces well.'],
  ['Is setup included in my time?', 'Yes. Your rental runs from when you arrive to when the space is empty, so plan setup and cleanup into it.'],
  ['What about alcohol?', 'Beer, wine and champagne with a WA banquet permit. No hard liquor, and nothing on the docks or in the park.'],
  ['Any discounts?', 'Members save 10%. Approved nonprofits may receive 20%.'],
]

export default function Spaces() {
  const [sent, setSent] = useState(false)
  const [pick, setPick] = useState<string[]>(['boathouse'])
  const [open, setOpen] = useState<number | null>(0)
  return (
    <Layout overlay>
      <PageHero eyebrow="Events" image={img('dock-wedding.jpg')} title="Event rentals" intro="Weddings, rehearsal dinners, holiday parties and meetings in the Floating Boat House, the Wagner Education Center Sail Loft and the Bill Garden Boat Hall. Rental fees support the museum.">
        <div className="flex flex-wrap gap-3"><Btn href="#inquire" variant="paper">Start an inquiry</Btn><Btn href="https://www.cwb.org/s/Facility-Rental-Information-Packet-Updated-111722.docx" variant="ghost-light">Download the info packet</Btn></div>
      </PageHero>

      <Section className="py-24">
        <div className="space-y-24">
          {spaces.map((s, i) => (
            <div key={s.id} className="grid lg:grid-cols-12 gap-10 items-center">
              <div className={`lg:col-span-7 reveal ${i % 2 ? 'lg:order-2' : ''}`}><img src={img(s.img)} alt={s.name} className="rounded-md w-full aspect-[4/3] object-cover" /></div>
              <div className={`lg:col-span-5 reveal ${i % 2 ? 'lg:order-1' : ''}`}>
                <Eyebrow className="text-rust">{s.where}</Eyebrow>
                <h2 className="display text-[40px] md:text-[56px] leading-[1] mt-5">{s.name}</h2>
                <p className="mt-6 text-lg text-ink-3 leading-relaxed">{s.body}</p>
                <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-ink/10 py-6">
                  <div><dt className="eyebrow text-ink-3">Seated</dt><dd className="display text-4xl mt-2">{s.seated}</dd></div>
                  <div><dt className="eyebrow text-ink-3">Standing</dt><dd className="display text-4xl mt-2">{s.standing}</dd></div>
                  <div><dt className="eyebrow text-ink-3">Size</dt><dd className="mt-3 font-semibold text-sm">{s.size}</dd></div>
                </dl>
                <p className="mt-6 eyebrow text-ink-3">Included</p>
                <ul className="mt-3 flex flex-wrap gap-2">{s.incl.map((x) => <li key={x} className="rounded-full bg-paper-2 px-3 py-1.5 text-sm">{x}</li>)}</ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-ink text-paper py-24">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <div className="grid lg:grid-cols-12 gap-10 items-end reveal">
            <div className="lg:col-span-7"><Eyebrow className="text-brass">2026 rates · either space</Eyebrow><h2 className="display text-[44px] md:text-[64px] leading-[.98] mt-5">2026 rates</h2></div>
            <p className="lg:col-span-5 text-paper/70 text-lg">50% at booking with a refundable $500 deposit, balance one month before the event. Full-building buyouts and the Bill Garden Boat Hall are quoted on request.</p>
          </div>
          <div className="mt-12 overflow-x-auto reveal">
            <table className="w-full min-w-[640px] text-left">
              <thead><tr className="eyebrow text-paper/50"><th className="py-4 font-normal">Season</th><th className="font-normal">Fri – Sun</th><th className="font-normal">Mon – Thu</th><th className="font-normal">Extra hour</th></tr></thead>
              <tbody>
                {rateRows.map((r) => (
                  <tr key={r.season} className="border-t border-paper/10">
                    <td className="py-6 pr-6 text-lg">{r.season}</td>
                    <td className="display text-4xl">${r.wkend.toLocaleString()}</td>
                    <td className="display text-4xl text-paper/80">${r.wkday.toLocaleString()}</td>
                    <td className="font-mono text-brass">${r.extra}/hr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Section className="py-24" id="inquire">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 reveal">
            <Eyebrow className="text-rust">Inquire</Eyebrow>
            <h2 className="display text-[40px] md:text-[56px] leading-[1] mt-5">Booking inquiry</h2>
            <p className="mt-6 text-ink-3 leading-relaxed">The Event Rentals Team reads every inquiry and replies with availability and a quote. A date you choose here is a preference, not a booking.</p>
            <figure className="mt-10 border-l-2 border-rust pl-6">
              <blockquote className="display-i text-2xl leading-snug">"The venue truly made the date memorable, and we couldn't have been happier."</blockquote>
              <figcaption className="mt-3 text-sm text-ink-3">Laura & Ben, married on the docks</figcaption>
            </figure>
          </div>
          <div className="lg:col-span-8 reveal">
            {sent ? (
              <div className="rounded-md bg-ink text-paper p-10 md:p-14">
                <p className="display text-5xl">Thank you.</p>
                <p className="mt-4 text-paper/70 text-lg max-w-xl">In production this would land with the Event Rentals Team. For this concept, please send it through the live inquiry form so nothing gets lost.</p>
                <div className="mt-8 flex flex-wrap gap-3"><Btn href="https://ravishingradish.com/cwb-inquiry" variant="paper">Open the live inquiry form</Btn><button onClick={() => setSent(false)} className="h-12 px-6 rounded-[3px] border border-paper/30 font-semibold">Edit my answers</button></div>
              </div>
            ) : (
              <form className="rounded-md bg-paper-2 p-6 md:p-10 grid md:grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                <fieldset className="md:col-span-2">
                  <legend className="eyebrow text-ink-3">Which spaces?</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[['loft', 'Sail Loft'], ['boathouse', 'Boathouse + deck'], ['hall', 'Bill Garden Boat Hall'], ['buyout', 'Full-building buyout'], ['charter', 'Add a charter cruise']].map(([id, l]) => {
                      const on = pick.includes(id)
                      return <button type="button" key={id} aria-pressed={on} onClick={() => setPick(on ? pick.filter((x) => x !== id) : [...pick, id])} className={`h-11 px-5 rounded-full text-sm font-semibold border transition ${on ? 'bg-ink text-paper border-ink' : 'border-ink/20 hover:border-ink'}`}>{l}</button>
                    })}
                  </div>
                </fieldset>
                <Field label="Your name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <label className="block"><span className="eyebrow text-ink-3">Event type</span>
                  <select className="mt-2 w-full h-12 rounded-xl bg-paper px-4 border border-ink/10" defaultValue="Wedding">{['Wedding', 'Rehearsal dinner', 'Corporate event', 'Birthday or celebration', 'Memorial', 'Nonprofit gathering', 'Other'].map((o) => <option key={o}>{o}</option>)}</select>
                </label>
                <Field label="Guest count" name="guests" type="number" placeholder="e.g. 60" />
                <Field label="Preferred date" name="date1" type="date" />
                <Field label="Alternate date" name="date2" type="date" />
                <label className="block md:col-span-2"><span className="eyebrow text-ink-3">Budget range</span>
                  <select className="mt-2 w-full h-12 rounded-xl bg-paper px-4 border border-ink/10" defaultValue="">{['Not sure yet', 'Under $3,000', '$3,000–$5,000', '$5,000–$10,000', '$10,000+'].map((o) => <option key={o}>{o}</option>)}</select>
                </label>
                <label className="block md:col-span-2"><span className="eyebrow text-ink-3">Anything else?</span><textarea rows={4} className="mt-2 w-full rounded-xl bg-paper p-4 border border-ink/10" placeholder="Timing, catering, a boat ride for the wedding party..." /></label>
                <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-sm text-ink-3">Members save 10% on rentals.</p>
                  <button className="group inline-flex h-12 items-center gap-3 rounded-full px-7 bg-rust text-paper font-semibold hover:bg-rust-deep">Send inquiry</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Section>

      <section className="bg-paper-2 py-24">
        <div className="mx-auto max-w-site px-5 md:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 reveal"><Eyebrow className="text-rust">Good to know</Eyebrow><h2 className="display text-[40px] md:text-[56px] leading-[1] mt-5">FAQ</h2></div>
          <div className="lg:col-span-8">
            {faqs.map(([q, a], i) => (
              <div key={q} className="border-b border-ink/15">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between py-6 text-left" aria-expanded={open === i}>
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

function Field({ label, ...p }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <label className="block"><span className="eyebrow text-ink-3">{label}</span><input {...p} className="mt-2 w-full h-12 rounded-xl bg-paper px-4 border border-ink/10 focus:outline-none focus:ring-2 focus:ring-rust" /></label>
}
