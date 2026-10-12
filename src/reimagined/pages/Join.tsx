import { Layout } from '../components/Layout'
import { PageHero, Btn, Eyebrow, Section } from '../components/ui'
import { img } from '../../lib/img'
import { memberships } from '../data'

export default function Join() {
  return (
    <Layout overlay>
      <PageHero eyebrow="Join" image={img('youth-paddle.jpg')} title="Membership and giving" intro="More than half of what it takes to run CWB comes from members and donors. Become a member, give an afternoon a week, or make a gift to keep the museum free for the next fifty years.">
        <div className="flex flex-wrap gap-3"><Btn href="#members" variant="paper">Membership</Btn><Btn href="#volunteer" variant="ghost-light">Volunteer</Btn><Btn href="#give" variant="ghost-light">Give</Btn></div>
      </PageHero>

      <Section className="py-24" id="members">
        <div className="grid lg:grid-cols-12 gap-10 items-end reveal">
          <div className="lg:col-span-7"><Eyebrow className="text-rust">Membership</Eyebrow><h2 className="display text-[44px] md:text-[64px] leading-[.98] mt-5">Membership levels</h2></div>
          <p className="lg:col-span-5 text-lg text-ink-3">Every member gets up to 25% off rentals, up to 20% off classes, the monthly newsletter, member events, and the right to buy a Livery Season Pass.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {memberships.map((m) => (
            <div key={m.name} className={`relative rounded-md p-8 flex flex-col reveal ${m.featured ? 'bg-ink text-paper' : 'bg-paper-2'}`}>
              {m.featured && <span className="absolute top-6 right-6 rounded-full bg-brass text-ink px-3 py-1 text-xs font-semibold">Most popular</span>}
              <p className={`eyebrow ${m.featured ? 'text-paper/60' : 'text-ink-3'}`}>{m.kind}</p>
              <p className="display text-4xl mt-3">{m.name}</p>
              <p className="display text-6xl mt-6">${m.price}<span className={`text-base font-sans ${m.featured ? 'text-paper/60' : 'text-ink-3'}`}> / year</span></p>
              <ul className="mt-6 space-y-2 flex-1">{m.perks.map((p) => <li key={p} className="flex gap-3"><span className={m.featured ? 'text-brass' : 'text-rust'}>✦</span><span className={m.featured ? 'text-paper/80' : 'text-ink-3'}>{p}</span></li>)}</ul>
              <a href="https://centerforwoodenboats2.my.site.com/gs/s/membership" className={`mt-8 inline-flex h-12 items-center justify-center rounded-full font-semibold transition ${m.featured ? 'bg-brass text-ink hover:bg-brass-light' : 'bg-ink text-paper hover:bg-ink-2'}`}>Join as {m.name}</a>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-3">Add a Junior Crew child membership for $25.</p>
      </Section>

      <section className="bg-ink text-paper py-24 overflow-hidden" id="volunteer">
        <div className="mx-auto max-w-site px-5 md:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 reveal">
            <Eyebrow className="text-brass">Volunteer · since 1977</Eyebrow>
            <h2 className="display text-[44px] md:text-[64px] leading-[.98] mt-5">Volunteer</h2>
            <p className="mt-6 text-lg text-paper/75 leading-relaxed">Skipper Public Sail, staff the livery, build toy boats with kids, repair sails, or work in the boatshop. Orientations run the second Saturday of every month. Ages 16 and up.</p>
            <div className="mt-8 grid grid-cols-2 gap-6 max-w-md">
              <div className="border-t border-paper/15 pt-4"><p className="display text-5xl text-brass">1 : 3</p><p className="mt-2 text-sm text-paper/60">One hour of boat use for every three volunteered</p></div>
              <div className="border-t border-paper/15 pt-4"><p className="display text-5xl text-brass">45 hrs</p><p className="mt-2 text-sm text-paper/60">earns a free membership and SailNOW! enrollment</p></div>
            </div>
            <div className="mt-10"><Btn href="https://www.cwb.org/volunteer" variant="paper">Apply to volunteer</Btn></div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 reveal"><img src={img('boatbuilder-planing.jpg')} alt="A volunteer planing a wooden hull in the boatshop" className="rounded-md w-full aspect-[4/5] object-cover" /></div>
        </div>
      </section>

      <Section className="py-24" id="give">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 reveal">
            <Eyebrow className="text-rust">The 50th season campaign</Eyebrow>
            <h2 className="display text-[44px] md:text-[64px] leading-[.98] mt-5">Keep it free for the next fifty.</h2>
            <p className="mt-6 text-lg text-ink-3 leading-relaxed">Two in five people who get on the water with us do it for free. Gifts keep it that way, and keep 170 wooden boats sound, sailing and in the hands of the public.</p>
            <div className="mt-8"><Btn href="https://centerforwoodenboats2.my.site.com/gs/s/donate">Make a gift</Btn></div>
            <p className="mt-4 text-sm text-ink-3">CWB is a 501(c)(3) nonprofit. Tax ID 91-1061721.</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 grid sm:grid-cols-2 gap-4">
            {[
              ['Stock & securities', 'Email development@cwb.org to transfer shares.'],
              ['Workplace giving', 'Benevity, YourCause, WA CFD (0456442) and King County (9977).'],
              ['Boats & tools', 'Donate boats, motors, trailers or woodworking tools. Email sgreaves@cwb.org.'],
              ['In memory or honor', 'Note a name with your online gift.'],
              ['Navigator Club', 'Leave a legacy gift in your will.'],
              ['Sponsorship', 'Put your company on the water. development@cwb.org'],
            ].map(([t, d]) => <div key={t} className="rounded-md bg-paper-2 p-6 reveal"><p className="display text-2xl">{t}</p><p className="mt-2 text-sm text-ink-3">{d}</p></div>)}
          </div>
        </div>
      </Section>
    </Layout>
  )
}
