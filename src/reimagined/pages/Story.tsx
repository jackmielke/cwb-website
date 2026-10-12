import { Layout } from '../components/Layout'
import { PageHero, Btn, Eyebrow, Section } from '../components/ui'
import { img } from '../../lib/img'

const chapters = [
  { y: '1957', h: 'A mast, a stranger, a habit.', t: 'Dick Wagner sees a man struggling to step a mast at a marina below the Fremont Bridge, and stops to help. It turns out to be the start of everything.' },
  { y: '1968', h: 'Boats for rent, from a houseboat.', t: 'Expecting their first child, Dick and Colleen Wagner start renting the small boats tied up around their floating home under the Aurora Bridge.' },
  { y: '1976', h: 'A living museum.', t: 'After a decade of rentals, the Wagners and their regulars, by now close friends, found The Center for Wooden Boats. Its purpose: education, through direct experience. The exhibits would be in the water and the public would use them.' },
  { y: '1983', h: 'A home on Waterway 4.', t: 'After a long shoreline permit process, the floating campus opens at the south end of Lake Union, on a slip that once served an asphalt plant and coal docks. The boathouse is dedicated in 1989.' },
  { y: '2019', h: 'A front door for the next century.', t: 'The Wagner Education Center opens, designed by Tom Kundig of Olson Kundig in the spirit of Northwest boatbuilding sheds. Dick did not live to see it; he died in 2017 at 83.' },
  { y: '2021', h: 'A city landmark.', t: 'Seattle designates the floating campus a landmark, protecting the boatshop, pavilion, oar house and boathouse for good.' },
  { y: '2026', h: 'Fifty seasons.', t: 'More than 350 people come home for the anniversary reunion. Today Lake Union, tomorrow the world.' },
]

const values = [
  ['Hands-on learning', 'Practical skills and traditional craft.'],
  ['Access', 'The joy of the water, without economic or cultural barriers.'],
  ['Empowered youth', 'Challenge that helps young people find their potential.'],
  ['Inclusion', 'A safe, friendly place for everyone.'],
  ['Stewardship', 'Care for the lake and the land around it.'],
  ['Passion', 'Boats change lives. We have seen it.'],
]

export default function Story() {
  return (
    <Layout overlay>
      <PageHero eyebrow="Our story · 1976–2026" image={img('docks-skyline.jpg')} title={<>It's written <span className="display-i text-brass">in the boats.</span></>} intro="The Center for Wooden Boats connects each of us to Seattle's living maritime heritage, through hands-on experiences building, exploring and using small boats." />

      <Section className="py-24 md:py-32">
        <div className="relative">
          <div className="absolute left-[18px] md:left-[calc(25%-1px)] top-0 bottom-0 w-px bg-ink/15" aria-hidden />
          <ol className="space-y-20">
            {chapters.map((c) => (
              <li key={c.y} className="relative grid md:grid-cols-4 gap-6 pl-14 md:pl-0 reveal">
                <span className="absolute left-[11px] md:left-[calc(25%-8px)] top-4 h-4 w-4 rounded-full bg-rust ring-[6px] ring-paper" />
                <p className="display text-6xl md:text-8xl text-rust leading-none md:pr-16 md:text-right">{c.y}</p>
                <div className="md:col-span-3 md:pl-16 max-w-2xl">
                  <h2 className="display text-3xl md:text-4xl">{c.h}</h2>
                  <p className="mt-4 text-lg text-ink-3 leading-relaxed">{c.t}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <section className="bg-ink text-paper py-24">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <div className="grid lg:grid-cols-12 gap-10 items-end reveal">
            <div className="lg:col-span-7"><Eyebrow className="text-brass">Our guiding stars</Eyebrow><h2 className="display text-[44px] md:text-[72px] leading-[.95] mt-5">A future where every community <span className="display-i text-brass">knows the water.</span></h2></div>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper/10 rounded-[28px] overflow-hidden">
            {values.map(([t, d]) => <div key={t} className="bg-ink p-8 reveal"><p className="display text-3xl">{t}</p><p className="mt-3 text-paper/60">{d}</p></div>)}
          </div>
        </div>
      </section>

      <Section className="py-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 reveal"><img src={img('aerial-slu.jpg')} alt="Aerial view of the CWB campus and South Lake Union" className="rounded-[28px] w-full aspect-[4/3] object-cover" /></div>
          <div className="lg:col-span-5 lg:col-start-8 reveal">
            <Eyebrow className="text-rust">Seattle's floating landmark</Eyebrow>
            <h2 className="display text-[40px] md:text-[56px] leading-[1] mt-5">Protected, so it can stay open to everyone.</h2>
            <p className="mt-6 text-lg text-ink-3 leading-relaxed">The City of Seattle designated our floating structures on Waterway 4 and the Old Boathouse, the Wagner Floating Home, as landmarks. Thank you to everyone who wrote letters and testified, to historian Sarah Martin, and to 4Culture.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Btn href="https://www.cwb.org/s/LandmarkCompleteApplication_02-17-2021_FINAL.pdf" variant="ghost">Read the nomination</Btn></div>
          </div>
        </div>
      </Section>
    </Layout>
  )
}
