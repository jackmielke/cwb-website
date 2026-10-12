import { useState, type ReactNode } from 'react'

// The Ravishing Radish CWB inquiry form, embedded inline on Facility Rentals instead of linking out.
// Fields mirror the live form at ravishingradish.com/cwb-inquiry, minus "Have you booked your venue?"
// (it confused prospects), plus a catering section adapted from Radish's corporate form.
export const LIVE_INQUIRY = 'https://ravishingradish.com/cwb-inquiry'

const spaces = ['Floating Boat House', 'Wagner Education Center Sail Loft', 'Bill Garden Boat Hall', 'Full building buyout']
const styles = ['Plated', 'Buffet', 'Family style', 'Passed appetizers', 'Stations', 'Not sure yet']
const meals = ['Breakfast', 'Lunch', 'Dinner', 'Appetizers only', 'Desserts only']

const input = 'w-full border border-[#cfcfcf] bg-white px-3 py-2.5 text-[15px] text-[#2b2b2b] focus:outline-none focus:border-[#AD4E25]'
const label = 'block text-[12px] font-semibold uppercase tracking-[.12em] mb-1.5'

function F({ l, children, wide }: { l: string; children: ReactNode; wide?: boolean }) {
  return <label className={wide ? 'sm:col-span-2' : ''}><span className={label}>{l}</span>{children}</label>
}

function Checks({ name, opts }: { name: string; opts: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {opts.map((o) => <label key={o} className="inline-flex items-center gap-2 text-[15px]"><input type="checkbox" name={name} value={o} className="accent-[#AD4E25] w-4 h-4" />{o}</label>)}
    </div>
  )
}

export function OgInquiry() {
  const [type, setType] = useState<'social' | 'corporate'>('social')
  const [cater, setCater] = useState('yes')
  const [sent, setSent] = useState(false)

  return (
    <section id="inquire" className="scroll-mt-6 my-14 border border-[#e2e2e2] bg-[#faf8f5] px-5 sm:px-10 py-10 not-prose">
      <p className="text-[12px] font-semibold uppercase tracking-[.15em] text-[#AD4E25]">Booking inquiries</p>
      <h2 className="!mt-2 !mb-3 !text-[1.9rem] !font-semibold">Tell us about your event</h2>
      <p className="max-w-2xl text-[15px]">Share a few details and our event rentals team will follow up with availability and a quote. Inquiries are handled with our catering partner, Ravishing Radish. Submitting this form does not reserve a date.</p>

      {sent ? (
        <div className="mt-8 border-l-4 border-[#AD4E25] bg-white px-6 py-6">
          <p className="font-semibold text-lg">Thank you, your inquiry is ready.</p>
          <p className="mt-2 text-[15px]">This is a design preview, so nothing was sent. On cwb.org this form posts to the same inbox as the <a href={LIVE_INQUIRY} target="_blank" rel="noreferrer">live inquiry form</a>, so a real inquiry never leaves the page.</p>
          <button onClick={() => setSent(false)} className="mt-4 og-btn !text-[11px] !py-2.5">Edit my answers</button>
        </div>
      ) : (
        <form className="mt-8 space-y-9" onSubmit={(e) => { e.preventDefault(); setSent(true); document.getElementById('inquire')?.scrollIntoView({ behavior: 'smooth' }) }}>
          <fieldset>
            <legend className="text-[1.05rem] font-semibold mb-3">What kind of event?</legend>
            <div className="flex flex-wrap gap-3">
              {(['social', 'corporate'] as const).map((t) => (
                <button type="button" key={t} onClick={() => setType(t)} aria-pressed={type === t}
                  className={`px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[.15em] border-2 ${type === t ? 'bg-[#AD4E25] border-[#AD4E25] text-white' : 'border-[#2b2b2b] hover:opacity-70'}`}>
                  {t === 'social' ? 'Wedding or social' : 'Corporate or nonprofit'}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
            <legend className="text-[1.05rem] font-semibold mb-3 sm:col-span-2">Your info</legend>
            <F l="First name"><input required className={input} autoComplete="given-name" /></F>
            <F l="Last name"><input required className={input} autoComplete="family-name" /></F>
            {type === 'corporate' && <F l="Company or organization" wide><input required className={input} autoComplete="organization" /></F>}
            <F l="Email"><input required type="email" className={input} autoComplete="email" /></F>
            <F l="Phone"><input required type="tel" className={input} autoComplete="tel" /></F>
            <F l="Mailing address" wide><input className={input} autoComplete="street-address" /></F>
          </fieldset>

          <fieldset className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
            <legend className="text-[1.05rem] font-semibold mb-3 sm:col-span-2">Event details</legend>
            <F l="What's the occasion?" wide><input required className={input} placeholder={type === 'social' ? 'Wedding, rehearsal dinner, birthday...' : 'Team offsite, board dinner, holiday party...'} /></F>
            <F l="Preferred date"><input required type="date" className={input} /></F>
            <F l="Alternate date"><input type="date" className={input} /></F>
            <F l="Start time"><input type="time" className={input} /></F>
            <F l="End time"><input type="time" className={input} /></F>
            <F l="Estimated guests"><input required type="number" min={1} className={input} /></F>
            <div className="sm:col-span-2">
              <span className={label}>Desired space</span>
              <Checks name="space" opts={spaces} />
              <p className="mt-2 text-[13px] text-[#666]">Rates are based on a 5-hour minimum that includes your setup and cleanup time.</p>
            </div>
          </fieldset>

          <fieldset className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
            <legend className="text-[1.05rem] font-semibold mb-3 sm:col-span-2">Catering</legend>
            <div className="sm:col-span-2">
              <span className={label}>Would you like Ravishing Radish to cater?</span>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {[['yes', 'Yes, please'], ['maybe', 'Not sure yet'], ['no', 'No, I have a caterer']].map(([v, l]) => (
                  <label key={v} className="inline-flex items-center gap-2 text-[15px]"><input type="radio" name="cater" value={v} checked={cater === v} onChange={() => setCater(v)} className="accent-[#AD4E25] w-4 h-4" />{l}</label>
                ))}
              </div>
            </div>
            {cater !== 'no' && (<>
              <div className="sm:col-span-2"><span className={label}>Meal</span><Checks name="meal" opts={meals} /></div>
              <div className="sm:col-span-2"><span className={label}>Service style</span><Checks name="style" opts={styles} /></div>
              <F l="Bar service">
                <select className={input} defaultValue="">
                  <option value="" disabled>Choose one</option>
                  <option>Beer and wine</option><option>Beer, wine and champagne toast</option><option>Non-alcoholic only</option><option>No bar</option>
                </select>
              </F>
              <F l="Food budget per guest"><input className={input} placeholder="e.g. $45" /></F>
              <F l="Dietary needs or allergies" wide><input className={input} placeholder="Vegetarian, gluten free, nut allergy..." /></F>
            </>)}
            <p className="sm:col-span-2 text-[13px] text-[#666]">CWB allows beer, wine and champagne. No hard liquor.</p>
          </fieldset>

          <fieldset className="grid gap-y-5">
            <legend className="text-[1.05rem] font-semibold mb-3">Last details</legend>
            <F l="Anything else we should know?"><textarea rows={4} className={input} /></F>
            <F l="How did you hear about us?">
              <select className={input} defaultValue="">
                <option value="" disabled>Choose one</option>
                <option>Search</option><option>Friend or past guest</option><option>Visited CWB</option><option>Wedding site or planner</option><option>Social media</option><option>Other</option>
              </select>
            </F>
          </fieldset>

          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-[#AD4E25] text-white px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[.15em] hover:bg-[#8A3A18]">Send inquiry</button>
          </div>
        </form>
      )}
    </section>
  )
}
