import { useMemo, useState } from 'react'
import { Layout } from '../components/Layout'
import { PageHero, Btn, Eyebrow, Section, Arrow } from '../components/ui'
import { img } from '../../lib/img'

type Who = 'Adults' | 'Youth' | 'Families'
type What = 'Sail' | 'Build' | 'Seamanship'
const programs: { t: string; who: Who[]; what: What; len: string; price?: string; d: string; href: string }[] = [
  { t: 'SailNOW! Learn to Sail', who: ['Adults'], what: 'Sail', len: 'One month', d: 'Our signature intensive: shore school, then 12 hours of lessons on the lake. You finish ready for your checkout.', href: 'https://www.cwb.org/sailnow-learn-to-sail' },
  { t: 'US Sailing Basic Keelboat', who: ['Adults'], what: 'Sail', len: '22 hours', d: 'Nationally recognized certification for keelboats under 27 feet in winds up to 15 knots. No prerequisites.', href: 'https://www.cwb.org/us-sailing-basic-keelboat-certification' },
  { t: 'Private sailing lessons', who: ['Adults', 'Families'], what: 'Sail', len: 'Flexible', d: 'One-on-one for beginners, refreshers or checkout prep. Bring two or three friends or family along.', href: 'https://www.cwb.org/private-sailing-lessons' },
  { t: 'Drop-in Shore School', who: ['Adults', 'Families'], what: 'Sail', len: '2 hours', d: 'The words, the knots and the physics, on dry land. A friendly first step.', href: 'https://www.cwb.org/dropin-shore-school' },
  { t: 'Sailing Skill Building Clinic', who: ['Adults'], what: 'Sail', len: 'Weekly', d: 'Low-cost and repeatable, three sailors at a time. For people who know the basics and want to get good.', href: 'https://www.cwb.org/sailing-skills-clinic' },
  { t: 'Summer Racing Series', who: ['Adults'], what: 'Sail', len: 'Summer', d: 'Friendly racing with random teams and boats. Prizes for the top three.', href: 'https://www.cwb.org/summer-racing-series' },
  { t: 'Summer camps', who: ['Youth'], what: 'Sail', len: 'Week-long', d: 'Sailing, rowing and maritime discovery for ages 8 to 15 with US Sailing trained instructors. Scholarships available.', href: 'https://www.cwb.org/summer-camps' },
  { t: 'Fall sailing & Learn to Race', who: ['Youth'], what: 'Sail', len: 'School year', d: 'After-school sailing through the fall, including Learn to Race on the RS Feva fleet.', href: 'https://www.cwb.org/youth-school-year-sailing' },
  { t: 'Junior Instructors', who: ['Youth'], what: 'Seamanship', len: 'Summer', d: 'Teens help coach camp sailors, earn service hours, and can certify as US Sailing Level One instructors at 16.', href: 'https://www.cwb.org/junior-instructor' },
  { t: 'Build your own boat (CLC)', who: ['Adults'], what: 'Build', len: '6 days', price: '$995 members · $1,125', d: 'Assemble a Chesapeake Light Craft kayak or dinghy in our shop, then take it home to finish. Six boats per class.', href: 'https://www.cwb.org/chesapeake-light-craft-boatbuilding-classes' },
  { t: 'Intro to Stitch & Glue', who: ['Adults'], what: 'Build', len: 'Workshop', price: '$500 members · $575', d: 'Help build kits alongside our instructors: plans, epoxy, fillets and fiberglass.', href: 'https://www.cwb.org/chesapeake-light-craft-boatbuilding-classes' },
  { t: 'Toy boatbuilding', who: ['Youth', 'Families'], what: 'Build', len: '1 afternoon', price: 'Free', d: 'Build, decorate and launch a wooden toy boat on Free Boating Days.', href: 'https://www.cwb.org/free-programs' },
  { t: 'Safe Powerboat Handling', who: ['Adults'], what: 'Seamanship', len: '16 hours', d: 'Coast Guard and NASBLA approved, on the water, for boats up to 26 feet.', href: 'https://www.cwb.org/safe-powerboat-handling' },
  { t: 'Small Boat Navigation', who: ['Adults'], what: 'Seamanship', len: '2 weekends', d: 'Charts, tides and currents for Puget Sound in ten hours.', href: 'https://www.cwb.org/small-boat-navigation' },
  { t: 'Maritime First Aid', who: ['Adults'], what: 'Seamanship', len: '4.5–8 hours', d: 'There is no 911 at sea. OSHA, L&I and USCG approved courses in the Sail Loft.', href: 'https://www.cwb.org/maritime-first-aid' },
]

export default function Learn() {
  const [who, setWho] = useState<Who | 'All'>('All')
  const [what, setWhat] = useState<What | 'All'>('All')
  const list = useMemo(() => programs.filter((p) => (who === 'All' || p.who.includes(who)) && (what === 'All' || p.what === what)), [who, what])
  return (
    <Layout overlay>
      <PageHero eyebrow="Learn & build" image={img('boatbuilder-planing.jpg')} title={<>Skills you learn <span className="display-i text-brass">with your hands.</span></>} intro="Our instructors have taught tens of thousands of people to sail, row and build since 1976. Pick your crew and your craft, and we will point you to the right first step." />

      <Section className="py-20">
        <div className="rounded-[28px] bg-ink text-paper p-6 md:p-10 reveal">
          <p className="display text-3xl md:text-4xl">Find your program</p>
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <Filter label="Who is learning?" value={who} set={setWho} opts={['All', 'Adults', 'Youth', 'Families']} />
            <Filter label="What do you want to do?" value={what} set={setWhat} opts={['All', 'Sail', 'Build', 'Seamanship']} />
          </div>
        </div>
        <p className="mt-8 font-mono text-sm text-ink-3">{list.length} programs</p>
        <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p) => (
            <a key={p.t} href={p.href} className="group rounded-[28px] border border-ink/10 bg-paper p-8 flex flex-col hover:border-rust hover:-translate-y-1 transition duration-300">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-rust/10 text-rust px-3 py-1 text-xs font-semibold">{p.what}</span>
                {p.who.map((w) => <span key={w} className="rounded-full bg-paper-2 px-3 py-1 text-xs font-semibold">{w}</span>)}
              </div>
              <p className="display text-3xl mt-6">{p.t}</p>
              <p className="mt-3 text-ink-3 leading-relaxed flex-1">{p.d}</p>
              <div className="mt-6 pt-5 border-t border-ink/10 flex items-center justify-between text-sm">
                <span className="font-mono">{p.len}{p.price ? ` · ${p.price}` : ''}</span>
                <span className="text-rust font-semibold flex items-center gap-2">Details <Arrow /></span>
              </div>
            </a>
          ))}
        </div>
      </Section>

      <section className="bg-paper-2 py-24">
        <div className="mx-auto max-w-site px-5 md:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 reveal"><img src={img('youth-paddle.jpg')} alt="Two kids paddling a homemade boat on Lake Union" className="rounded-[28px] w-full aspect-[4/3] object-cover" /></div>
          <div className="lg:col-span-5 lg:col-start-8 reveal">
            <Eyebrow className="text-rust">Young Mariners Initiative</Eyebrow>
            <h2 className="display text-[40px] md:text-[56px] leading-[1] mt-5">Every kid should get to <span className="display-i text-rust">take the tiller.</span></h2>
            <p className="mt-6 text-lg text-ink-3 leading-relaxed">Scholarships, free after-school sailing on El Toros, intro-to-maritime programs for high schoolers and paid internships with partners like the Port of Seattle. 111 youth scholarships went out in a single year.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Btn href="https://www.cwb.org/ymi">Apply or learn more</Btn><Btn href="mailto:youth@cwb.org" variant="ghost">youth@cwb.org</Btn></div>
          </div>
        </div>
      </section>

      <Section className="py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 reveal">
            <Eyebrow className="text-rust">Boatwright in Residence</Eyebrow>
            <h2 className="display text-[40px] md:text-[56px] leading-[1] mt-5">The next generation of boatwrights trains here.</h2>
            <p className="mt-6 text-lg text-ink-3 leading-relaxed">Recent graduates of wooden boatbuilding programs join our four boatshops to restore the fleet alongside our staff. Apprentices rebuilt <em>Pamela</em>, a 1936 Blanchard Junior Knockabout, frame by steam-bent frame.</p>
            <div className="mt-8"><Btn href="https://www.cwb.org/boatwright-apprentice" variant="ghost">About the apprenticeship</Btn></div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 reveal"><img src={img('boat-ribs.jpg')} alt="Boatwrights fitting steam-bent ribs into a wooden hull" className="rounded-[28px] w-full aspect-[4/3] object-cover" /></div>
        </div>
      </Section>
    </Layout>
  )
}

function Filter<T extends string>({ label, value, set, opts }: { label: string; value: T; set: (v: T) => void; opts: T[] }) {
  return (
    <div>
      <p className="eyebrow text-paper/50">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {opts.map((o) => (
          <button key={o} onClick={() => set(o)} className={`h-11 px-5 rounded-full text-sm font-semibold border transition ${value === o ? 'bg-brass text-ink border-brass' : 'border-paper/25 hover:border-paper'}`}>{o}</button>
        ))}
      </div>
    </div>
  )
}
