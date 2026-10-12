import { Layout } from '../components/Layout'
import { PageHero, Btn, Eyebrow, Section } from '../components/ui'
import { img } from '../../lib/img'

const past = ['waste is a construct', 'Voyages in Color', 'Marine Mosaic', 'Coast Guard Art Program', 'Lake Union Wooden Boat Festival Posters', 'Highliners: Boats of the Century', 'Still Afloat: Historic Small Craft of King County', 'Fish On!', 'Persistent Work']

export default function Museum() {
  return (
    <Layout overlay>
      <PageHero eyebrow="The museum" image={img('wec-hanging-boats.jpg')} title="The collection" intro="More than 170 vessels, most of them small sail and row boats from the Pacific Northwest. Some hang from the rafters of the Wagner Education Center. Most are tied up at our docks, and many can be rented." />

      <Section className="py-24">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 reveal"><Eyebrow className="text-rust">On view now</Eyebrow></div>
          <div className="lg:col-span-8 space-y-16">
            <article className="reveal">
              <p className="eyebrow text-ink-3">May 6 – November 8, 2026 · Wagner Education Center</p>
              <h2 className="display text-[40px] md:text-[64px] leading-[1] mt-4">PRIMA Jubilee: A Nautical Celebration</h2>
              <p className="mt-6 text-lg text-ink-3 leading-relaxed max-w-2xl">The Pacific Rim Institute of Marine Artists was founded in 2016 to bring together maritime artists living on or near the Pacific Rim. For its jubilee, seventeen of them from across the West Coast and Hawaii hang their best marine work among our boats.</p>
              <div className="mt-6"><Btn href="https://www.cwb.org/prima-jubilee" variant="ghost">About the exhibition</Btn></div>
            </article>
            <article className="reveal border-t border-ink/15 pt-16">
              <p className="eyebrow text-ink-3">Long-term · since March 2019</p>
              <h2 className="display text-[40px] md:text-[56px] leading-[1] mt-4">Historic Small Craft of the Pacific Northwest</h2>
              <p className="mt-6 text-lg text-ink-3 leading-relaxed max-w-2xl">Nine small craft, most of them from King County and many of them retired from our own working fleet, opened with the Wagner Education Center.</p>
            </article>
          </div>
        </div>
      </Section>

      {/* Lucile */}
      <section className="bg-ink text-paper py-24 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-site px-5 md:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 reveal relative">
            <img src={img('boat-ribs.jpg')} alt="Volunteers and boatwrights building a wooden hull" className="rounded-md w-full aspect-[4/3] object-cover" />
            <div className="absolute -bottom-6 left-6 rounded-md bg-brass text-ink px-6 py-4 font-mono text-sm">LOA 15 ft · Beam 6 ft · Sail 163 sq ft · Draft 8 in</div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 reveal">
            <Eyebrow className="text-brass">Built in public</Eyebrow>
            <h2 className="display text-[44px] md:text-[64px] leading-[.98] mt-5">Meet Lucile.</h2>
            <p className="mt-6 text-lg text-paper/75 leading-relaxed">A 1920 Kitten-class catboat, one of Seattle Yacht Club's first youth boats, built by Blanchard. No seaworthy wooden Kittens were known to survive. So we found the plans in a 1920 magazine at the Seattle Public Library and built one.</p>
            <p className="mt-4 text-paper/60 leading-relaxed">Over two years, more than a hundred students, interns, volunteers and staff worked larch planking, white oak frames and Sitka spruce spars. She was christened on October 16, 2020, the first wooden boat built in the Wagner Education Center.</p>
          </div>
        </div>
      </section>

      <Section className="py-24">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-md bg-paper-2 p-10 reveal">
            <Eyebrow className="text-rust">Restoration</Eyebrow>
            <p className="display text-4xl mt-5">Seventy years old and nearly good as new.</p>
            <p className="mt-4 text-ink-3 leading-relaxed">Our Blanchard Junior Knockabouts were designed and built on Lake Union between the 1930s and 1960s, and they still go out every day. V. Velez got new frames, deck and planking; Pamala got new garboards and fresh caulking. The work never stops, and volunteers are welcome in the shop.</p>
          </div>
          <div className="rounded-md bg-paper-2 p-10 reveal">
            <Eyebrow className="text-rust">Preservation</Eyebrow>
            <p className="display text-4xl mt-5">A digital catalog, coming to the docks.</p>
            <p className="mt-4 text-ink-3 leading-relaxed">From photogrammetry experiments in 2014 to CAD models of our hulls, we document every boat so its shape and story outlast its timber. Next: a public catalog of the whole fleet, reachable from QR codes on the docks.</p>
          </div>
        </div>
      </Section>

      <section className="pb-24">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <Eyebrow className="text-rust reveal">From the archive · past exhibits</Eyebrow>
          <ul className="mt-8 border-t border-ink/15">
            {past.map((p, i) => (
              <li key={p} className="group border-b border-ink/15 py-5 flex items-baseline gap-6 reveal">
                <span className="font-mono text-xs text-ink-3 w-8">{String(i + 1).padStart(2, '0')}</span>
                <span className="display text-3xl md:text-4xl group-hover:text-rust group-hover:translate-x-2 transition">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}
