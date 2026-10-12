import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { OgLayout, SocialIcons } from './OgLayout'
import { sqs } from '../lib/img'

const O = '/original'
const CDN = 'https://images.squarespace-cdn.com/content/v1/5c48db894eddeca43abfade1/'
const IMG = {
  hero: CDN + '1648754628305-688IN90AZW96Y2X0DIVD/RAD02665.jpg',
  film: CDN + '1650751830146-PQDNDPV29ZVRUHB0FNW6/RAD03807-L.jpeg',
  aerial: CDN + '1621977051611-2TD61JCYKPH4380JBL10/20190928-DJI_0011.jpg',
  logoMain: CDN + '1548361729815-CCGH0HKAA6MXTSUTL69Z/Asset+2Color+main.png',
  peapod: CDN + '02999003-32ad-4069-99dd-c404d924669f/PUBLIC+PEAPOD+PROGRAM.png',
  yellow: CDN + '1550161190319-XR6V5YPK3PV3I8ZYJHDD/Asset+4Color+yellow.png',
  gallery: [
    '1655323312181-8RJZCM7VWZ2C1A3P7ED8/RAD02665.jpg', '1555108779615-0OZ53KIGFCBMVEDJNG5A/WECGrandOpening_3.24.19_SandyLam002.jpg', '1655323275707-LV2ICX82WGPNAMP9WIY7/CWB_SouthLakeUnion4.jpg',
    '1655323215316-0H9B3EPTP8U9B0DXBMLL/CWB_13.jpg', '1655323403797-UOFMB6F5K97ODPHE3KZF/Wolf--3.jpg', '1555108706218-NJPOMQU4DBGPT8P0678E/WEC_GrandOpening_3.23.19_SandyLam212.jpg',
    '1655323213795-PYC25F1BKQDTUV7FFPG8/CWB_SouthLakeUnion_2019Regatta-ByDavidMillar1.jpg', '1655323260223-67SYDHSFB6JYAXIAEKZX/CWB_SouthLakeUnion_PhotobyMikelAmias1.jpg',
  ].map((p) => CDN + p),
  insta: ['1638286331148-ZQEKKMTZ9XZH0V0609EQ', '1637771668005-V6LTZ206KNPPDULMQ5FV', '1637681456700-OU4KGAG22BTCKLIZANXO', '1637253581401-IIXNKTV71V40FBUATVFN', '1636649769204-K318SVZJR77WZMZS9GRX', '1636566360309-YEL1BC43OP51YK1RWEBJ'].map((p) => `${CDN}${p}/image-asset.jpeg`),
}

const sections = [
  ['home-top', 'Home'], ['hours', 'Watch the BBC Storyworks Short Film on CWB!'], ['subscribe', 'Newsletter'], ['free-main', 'Free Programs'], ['home-exhibits', 'Exhibits'], ['social', 'Follow us on social!'],
]

export default function OriginalHome() {
  const [active, setActive] = useState('home-top')
  const [slide, setSlide] = useState(0)
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { threshold: 0.4 })
    sections.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <OgLayout overlay>
      {/* Index navigation dots */}
      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3" aria-label="Sections">
        {sections.map(([id, label]) => (
          <button key={id} onClick={() => go(id)} aria-label={label} title={label} className={`h-[10px] w-[10px] rounded-full border border-white/80 shadow ${active === id ? 'bg-white' : 'bg-white/40'}`} />
        ))}
      </nav>

      <section id="home-top" className="relative min-h-[100vh] text-white">
        <img src={sqs(IMG.hero, 2500)} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative grid md:grid-cols-12 px-[4vw] pt-[22vh] pb-28">
          <div className="hidden md:block md:col-span-6" />
          <div className="md:col-span-6 og-hero-text [text-shadow:0_1px_3px_rgba(0,0,0,.35)]">
            <h1 className="text-[2.6rem] md:text-[3.1rem] leading-[1.2] font-semibold">What’s Happening at CWB:</h1>
            <h2 className="mt-8 text-[1.3rem] font-normal">Current Hours:</h2>
            <ul className="mt-2 list-disc pl-6 text-[15px] tracking-[.04em]"><li><strong>11:30 AM - 7:00 PM Wednesday - Sunday</strong> | Last Boat Out @ 5:30 PM</li></ul>
            <h2 className="mt-6 text-[1.3rem] font-normal">Member Events in September:</h2>
            <ul className="mt-2 list-disc pl-6 text-[15px] tracking-[.04em]"><li><a href="https://www.cwb.org/hh4g" className="underline font-bold">Happy Hour 4 Good</a>: September 17th 6:00pm - 8:00pm</li></ul>
            <h2 className="mt-6 text-[1.3rem] font-normal"><Link to={`${O}/adult-sailing`} className="underline decoration-1">Sailing and Boating:</Link></h2>
            <ul className="mt-2 list-disc pl-6 text-[15px] tracking-[.04em] space-y-1">
              <li>See The <Link to={`${O}/wood-regatta`} className="underline font-bold">Norm Blanchard W.O.O.D. Regatta</Link> Results and Photos</li>
              <li><Link to={`${O}/rent`} className="underline font-bold">Season Passes</Link> are available! make gift giving easy!</li>
              <li>Checkout our new Classes: <a href="https://www.cwb.org/sailing-skills-clinic" className="underline">Sailing Skill building</a> and <a href="https://www.cwb.org/safe-powerboat-handling" className="underline">Safe Powerboat Handling</a></li>
            </ul>
            <h2 className="mt-6 text-[1.3rem] font-normal"><Link to={`${O}/youth-programs-camps`} className="underline decoration-1">Youth Programs</Link></h2>
            <ul className="mt-2 list-disc pl-6 text-[15px] tracking-[.04em] space-y-1">
              <li><a href="https://www.cwb.org/youth-school-year-sailing" className="underline font-bold">2026 Fall Youth Sailing Registrations are Live!</a></li>
              <li>Learn to Race begins September 12th. Don’t miss out!</li>
            </ul>
            <h2 className="mt-6 text-[1.3rem] font-normal">Woodworking and Boatbuilding:</h2>
            <ul className="mt-2 list-disc pl-6 text-[15px] tracking-[.04em]"><li>2027 <Link to={`${O}/chesapeake-light-craft-boatbuilding-classes`} className="underline">CLC Boatbuilding</Link> Classes will be posted in february</li></ul>
            <h2 className="mt-6 text-[1.3rem] font-normal">Museum:</h2>
            <ul className="mt-2 list-disc pl-6 text-[15px] tracking-[.04em]">
              <li><strong>May 6 - November 8: <Link to={`${O}/prima-jubilee`} className="underline">PRIMA Jubilee Art Exhibition: A Nautical Celebration</Link></strong>
                <ul className="list-[circle] pl-6 mt-2 italic text-[14px]"><li>Seventeen artists from across the West Coast and Hawaii come together through the PRIMA to exhibit their best marine work here at The Center for Wooden Boats. Feel the awe of Pacific waterways through the eyes of their locals.</li></ul>
              </li>
            </ul>
          </div>
        </div>
        <button onClick={() => go('hours')} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[.2em] uppercase flex flex-col items-center gap-1">Scroll<svg width="26" height="14" viewBox="0 0 26 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1l12 12L25 1" /></svg></button>
      </section>

      <section id="hours" className="bg-white px-[6vw] py-20">
        <hr className="border-[#e2e2e2] mb-14" />
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-[1300px] mx-auto">
          <div>
            <h2 className="text-[1.8rem] leading-snug">Watch the BBC Storyworks Short Film on CWB!</h2>
            <p className="mt-5">We were excited to participate in a short film made by BBC Storyworks on our work at the Center and how it is supported by design. The film is part of the online series "In Pursuit of Wellness", presented by the Global Wellness Institute and in collaboration with Olson Kundig.</p>
            <p className="mt-4">Click the image on the right to watch a 1-minute trailer, and watch the <a className="underline text-[#AD4E25]" href="https://www.bbc.com/storyworks/in-pursuit-of-wellness/shape-of-water">full, 5-minute video here.</a></p>
          </div>
          <a href="https://www.bbc.com/storyworks/in-pursuit-of-wellness/shape-of-water" className="relative block group">
            <img src={sqs(IMG.film, 1000)} alt="BBC Storyworks film still" className="w-full aspect-video object-cover" />
            <span className="absolute inset-0 grid place-items-center"><span className="h-16 w-16 rounded-full bg-black/60 grid place-items-center group-hover:scale-110 transition"><svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M7 4v16l13-8z" /></svg></span></span>
            <span className="block mt-2 text-sm text-[#6b6b6b]">Click the image to play the video.</span>
          </a>
        </div>
        <hr className="border-[#e2e2e2] my-14 max-w-[1300px] mx-auto" />
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-[1300px] mx-auto">
          <a href="https://www.cwb.org/cwb-landmarking" className="block bg-[#111] aspect-video grid place-items-center text-white text-sm">
            <span className="flex items-center gap-3"><span className="h-14 w-14 rounded-full bg-white/15 grid place-items-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M7 4v16l13-8z" /></svg></span>CWB Landmark Designation</span>
          </a>
          <div>
            <h1 className="text-[2.4rem] font-semibold">We are a landmark!</h1>
            <h2 className="mt-4 text-[1.35rem] leading-snug">The Center for Wooden Boats is now a Landmark as designated by the City of Seattle. This includes the floating structures of our South Lake Union home (also known as Waterway 4) and The Old Boathouse (also known as the Wagner Floating Home).</h2>
            <p className="mt-4">We are incredibly grateful to our community for writing to the Board on our behalf, and to those who gave testimony during the hearings. A special thank you to Sarah Martin for her tireless research and expertise. Application was made possible with support from <a href="https://www.4culture.org/" className="underline text-[#AD4E25]">4Culture</a>.</p>
            <p className="mt-4">Learn about the Landmark designation, how it came to be and what it means for us in this short video produced by CWB volunteer Shelley Sabin.</p>
          </div>
        </div>
        <hr className="border-[#e2e2e2] my-14 max-w-[1300px] mx-auto" />
        <div className="max-w-[1300px] mx-auto text-center">
          <h2 className="text-[1.6rem]">Follow us on <a href="https://www.instagram.com/centerforwoodenboats/" className="underline">Instagram</a> to see what’s going on today!</h2>
          <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-2">
            {IMG.insta.map((s) => <a key={s} href="https://www.instagram.com/centerforwoodenboats/"><img src={sqs(s, 500)} alt="" className="aspect-square object-cover w-full hover:opacity-80" /></a>)}
          </div>
        </div>
      </section>

      <section id="subscribe" className="relative text-white py-28 px-6">
        <img src={sqs(IMG.aerial, 2500)} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative max-w-[640px] mx-auto text-center">
          <img src={sqs(IMG.logoMain, 750)} alt="The Center for Wooden Boats" className="mx-auto w-[260px]" />
          <h2 className="mt-10 text-[1.9rem]">Subscribe to our Newsletter</h2>
          <p className="mt-2">Get all the latest updates from CWB!</p>
          <form className="mt-6 grid sm:grid-cols-2 gap-3 text-left" onSubmit={(e) => { e.preventDefault(); window.open('https://www.cwb.org/enews', '_blank') }}>
            <input placeholder="First Name" aria-label="First Name" className="px-4 py-3 text-[#2b2b2b]" />
            <input placeholder="Last Name" aria-label="Last Name" className="px-4 py-3 text-[#2b2b2b]" />
            <input type="email" required placeholder="Email Address" aria-label="Email Address" className="sm:col-span-2 px-4 py-3 text-[#2b2b2b]" />
            <button className="sm:col-span-2 og-btn justify-self-center mt-2">Sign Up</button>
          </form>
          <p className="mt-3 text-sm opacity-80">We respect your privacy.</p>
        </div>
      </section>

      <section id="free-main" className="relative py-24 px-6 bg-[#F1C54C] overflow-hidden">
        <img src={sqs(IMG.yellow, 2500)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="relative max-w-[1100px] mx-auto text-center">
          <h2 className="text-[2.1rem] md:text-[2.5rem] leading-snug">We believe everyone should have access to maritime experiences.</h2>
          <img src={sqs(IMG.peapod, 1500)} alt="Public Peapod Program" className="mx-auto mt-10 w-full md:w-2/3" />
          <Link to={`${O}/free-programs`} className="og-btn mt-10">View our free programs →</Link>
        </div>
      </section>

      <section id="home-exhibits" className="bg-white px-[6vw] py-24">
        <div className="max-w-[1300px] mx-auto grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4">
            <h1 className="text-[2.3rem] leading-tight font-semibold">Experience the history that’s written in boats.</h1>
            <p className="mt-6">The Center for Wooden Boats is a living museum. We encourage our community to experience heritage in a way that you can sail, build, and explore. In thanks to the opening of the Wagner Education Center, The Center for Wooden Boats is now able to put more of our collections on display. From dynamic gallery installations to boat hanging exhibits, CWB is able to offer a peek into the world of maritime heritage like never before.</p>
            <p className="mt-4 font-semibold">Admission is free.</p>
            <Link to={`${O}/current-exhibits`} className="og-btn mt-6">View Exhibits →</Link>
          </div>
          <div className="md:col-span-8">
            <div className="relative aspect-[3/2] bg-[#eee] overflow-hidden">
              {IMG.gallery.map((g, i) => <img key={g} src={sqs(g, 1500)} alt="" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === slide ? 'opacity-100' : 'opacity-0'}`} />)}
              <button aria-label="Previous" onClick={() => setSlide((slide + IMG.gallery.length - 1) % IMG.gallery.length)} className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-4xl drop-shadow">‹</button>
              <button aria-label="Next" onClick={() => setSlide((slide + 1) % IMG.gallery.length)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-4xl drop-shadow">›</button>
            </div>
            <div className="mt-2 flex gap-2 overflow-x-auto">
              {IMG.gallery.map((g, i) => <button key={g} onClick={() => setSlide(i)} className={`shrink-0 ${i === slide ? 'opacity-100' : 'opacity-50'}`}><img src={sqs(g, 300)} alt="" className="h-14 w-20 object-cover" /></button>)}
            </div>
          </div>
        </div>
      </section>

      <section id="social" className="relative py-20 px-6 bg-[#F1C54C] overflow-hidden text-center">
        <img src={sqs(IMG.yellow, 2500)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="relative">
          <h2 className="text-[1.9rem]">Follow us online @centerforwoodenboats!</h2>
          <SocialIcons className="mt-6" />
        </div>
      </section>
    </OgLayout>
  )
}
