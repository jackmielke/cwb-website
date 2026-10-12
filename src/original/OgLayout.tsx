import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { originalNav } from '../content/nav'
import { img } from '../lib/img'

const O = '/original'

// Faithful recreation of the cwb.org Squarespace header: logo left, two-row uppercase nav, DONATE outline, search.
export function OgHeader({ overlay }: { overlay: boolean }) {
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState<string | null>(null)
  const loc = useLocation()
  useEffect(() => { setOpen(false); setDrop(null) }, [loc.pathname])
  const text = overlay ? 'text-white' : 'text-[#2b2b2b]'
  const row1 = originalNav.slice(0, 7)
  const row2 = originalNav.slice(7)
  const Item = ({ g }: { g: (typeof originalNav)[number] }) => (
    <div className="relative" onMouseEnter={() => setDrop(g.label)} onMouseLeave={() => setDrop(null)}>
      {g.slug ? (
        <Link to={`${O}/${g.slug}`} className="block py-1.5 hover:opacity-70">{g.label}</Link>
      ) : (
        <button className="block py-1.5 uppercase tracking-[.1em] hover:opacity-70" aria-expanded={drop === g.label} onClick={() => setDrop(drop === g.label ? null : g.label)}>{g.label}</button>
      )}
      {!!g.items.length && drop === g.label && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50">
          <div className="bg-white text-[#2b2b2b] shadow-[0_2px_12px_rgba(0,0,0,.15)] py-3 min-w-[220px] text-left normal-case tracking-normal">
            {g.items.map((i) => <Link key={i.slug} to={`${O}/${i.slug}`} className="block px-5 py-1.5 text-[13px] hover:bg-[#f3f3f3] whitespace-nowrap">{i.label}</Link>)}
          </div>
        </div>
      )}
    </div>
  )
  return (
    <header className={`${overlay ? 'absolute inset-x-0 top-0' : 'relative bg-white border-b border-[#e2e2e2]'} z-40 ${text}`}>
      <div className="flex items-start justify-between px-[2.5vw] pt-[22px] pb-4">
        <Link to={O} aria-label="The Center for Wooden Boats"><img src={img('cwb-logo.png')} alt="The Center for Wooden Boats" className="w-[150px] md:w-[180px] h-auto" /></Link>
        <div className="hidden lg:flex items-start gap-6">
          <nav className="flex flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-[.1em]" aria-label="Main">
            <div className="flex gap-x-[2.1vw]">{row1.map((g) => <Item key={g.label} g={g} />)}</div>
            <div className="flex gap-x-[2.1vw]">{row2.map((g) => <Item key={g.label} g={g} />)}</div>
          </nav>
          <a href="https://www.cwb.org/give" className={`mt-1 inline-block border-2 ${overlay ? 'border-white' : 'border-[#2b2b2b]'} px-4 py-2 text-[10px] font-semibold uppercase tracking-[.15em] hover:opacity-70`}>Donate</a>
          <button aria-label="Search" className="mt-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><circle cx="10" cy="10" r="7" /><path d="M15.5 15.5 22 22" /></svg></button>
        </div>
        <button onClick={() => setOpen(!open)} className="lg:hidden mt-2" aria-label="Menu" aria-expanded={open}>
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M0 2h28M0 10h28M0 18h28" /></svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-white text-[#2b2b2b] px-6 py-4 shadow-lg max-h-[75vh] overflow-y-auto">
          {originalNav.map((g) => (
            <div key={g.label} className="py-2 border-b border-[#eee]">
              {g.slug ? <Link to={`${O}/${g.slug}`} className="uppercase text-xs font-semibold tracking-[.1em]">{g.label}</Link> : <p className="uppercase text-xs font-semibold tracking-[.1em]">{g.label}</p>}
              {g.items.map((i) => <Link key={i.slug} to={`${O}/${i.slug}`} className="block pl-3 py-1 text-sm">{i.label}</Link>)}
            </div>
          ))}
          <a href="https://www.cwb.org/give" className="mt-3 inline-block border-2 border-[#2b2b2b] px-4 py-2 text-xs font-semibold uppercase tracking-[.15em]">Donate</a>
        </div>
      )}
    </header>
  )
}

const social = [
  { label: 'Facebook', href: 'https://www.facebook.com/centerforwoodenboats', d: 'M14 9h3V5h-3c-2.8 0-4 1.7-4 4v2H8v4h2v8h4v-8h3l1-4h-4V9.5c0-.3.2-.5.5-.5z' },
  { label: 'Instagram', href: 'https://www.instagram.com/centerforwoodenboats/', d: 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.5-1.5a1 1 0 100 2 1 1 0 000-2z' },
  { label: 'YouTube', href: 'https://www.youtube.com/user/centerforwoodenboats', d: 'M22 8.5c0-1.7-1.3-3-3-3H5c-1.7 0-3 1.3-3 3v7c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3v-7zM10 15V9l5 3-5 3z' },
]

export function SocialIcons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex justify-center gap-4 ${className}`}>
      {social.map((s) => <a key={s.label} href={s.href} aria-label={s.label} className="hover:opacity-70"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d={s.d} /></svg></a>)}
    </div>
  )
}

export function OgFooter() {
  return (
    <footer className="bg-[#AD4E25] text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-16 grid md:grid-cols-12 gap-10 text-[14px] leading-relaxed">
        <div className="md:col-span-2" />
        <div className="md:col-span-3">
          <p className="font-semibold tracking-[.15em] text-[12px]">ADDRESS</p>
          <p className="mt-3">SOUTH LAKE UNION<br />1010 Valley Street<br />Seattle, WA 98109<br />(206) 382-2628</p>
          <p className="mt-3"><Link to={`${O}/hourslocations`} className="underline">Exhibit and Livery Hours Can Be Found Here.</Link></p>
          <Link to={`${O}/contact`} className="mt-4 og-btn !text-[11px] !py-2.5">Contact us</Link>
        </div>
        <div className="md:col-span-3">
          <p className="font-semibold tracking-[.15em] text-[12px]">MUSEUM HOURS</p>
          <p className="mt-3"><Link to={`${O}/hourslocations`} className="underline">Exhibit and Livery Hours Can Be Found Here.</Link></p>
          <p className="mt-3"><Link to={`${O}/rent`} className="underline">Boat rentals are available in Livery!</Link></p>
          <p className="mt-3 font-semibold italic">Admission is always free.</p>
        </div>
        <div className="md:col-span-3">
          <p className="font-semibold tracking-[.15em] text-[12px]">SUBSCRIBE</p>
          <form className="mt-3" onSubmit={(e) => { e.preventDefault(); window.open('https://www.cwb.org/enews', '_blank') }}>
            <input type="email" placeholder="Email Address" aria-label="Email Address" className="w-full px-3 py-3 text-[#2b2b2b]" required />
            <button className="mt-3 og-btn !text-[11px] !py-2.5 bg-transparent">Sign Up</button>
          </form>
          <p className="mt-2 text-[12px] opacity-80">We respect your privacy.</p>
        </div>
      </div>
      <div className="pb-12 text-center">
        <SocialIcons />
        <p className="mt-6 text-[13px]">©The Center for Wooden Boats | 2025</p>
        <p className="text-[13px]">The Center for Wooden Boats is a registered 501(c)(3) nonprofit museum based in Seattle, WA.</p>
        <p className="mt-4 text-[12px] opacity-80"><Link to="/" className="underline">Design comparison home</Link> · <Link to="/reimagined" className="underline">See the reimagined site</Link></p>
      </div>
    </footer>
  )
}

export function OgLayout({ children, overlay = false }: { children: ReactNode; overlay?: boolean }) {
  const loc = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [loc.pathname])
  // Hide any remote photo that fails to load rather than showing a broken-image icon.
  useEffect(() => {
    const on = (e: Event) => { const t = e.target as HTMLElement; if (t.tagName === 'IMG') t.classList.add('og-broken') }
    document.addEventListener('error', on, true)
    return () => document.removeEventListener('error', on, true)
  }, [])
  return (
    <div className="og min-h-screen relative">
      <OgHeader overlay={overlay} />
      <main>{children}</main>
      <OgFooter />
    </div>
  )
}
