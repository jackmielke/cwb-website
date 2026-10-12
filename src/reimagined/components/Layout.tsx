import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Logo } from './Logo'
import { mainNav, R } from '../nav'
import { useStatus, StatusDot } from './StatusPill'
import { img } from '../../lib/img'
import { useReveal } from '../../lib/useReveal'

const menuPhotos = ['wec-dusk.jpg', 'dinghy-sail.jpg', 'boat-ribs.jpg', 'gallery-hall.jpg', 'boathouse-lanterns.jpg', 'docks-skyline.jpg']

export function Layout({ children, overlay = false }: { children: ReactNode; overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(0)
  const loc = useLocation()
  const st = useStatus()
  useReveal(loc.pathname)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [loc.pathname])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  const solid = !overlay || scrolled
  return (
    <div className="rx min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-2 focus:left-2 focus:bg-ink focus:text-paper focus:px-4 focus:py-2">Skip to content</a>

      <header className={`sticky top-0 z-50 transition-all duration-500 ${solid ? 'bg-paper/90 backdrop-blur-md border-b border-ink/10 text-ink' : 'bg-transparent text-paper'} ${overlay && !scrolled ? '-mb-[84px]' : ''}`}>
        <div className="mx-auto max-w-site px-5 md:px-10 h-[84px] flex items-center justify-between gap-6">
          <Link to={R} aria-label="The Center for Wooden Boats, home" className="shrink-0"><Logo className={`transition-all duration-500 ${solid ? 'h-10' : 'h-12'}`} /></Link>
          <nav className="hidden xl:flex items-center gap-7 text-[14.5px] font-medium" aria-label="Main">
            {mainNav.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => `link-u py-1 ${isActive ? 'underline decoration-2 underline-offset-[10px] decoration-rust' : ''}`}>{n.label}</NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to={`${R}/visit`} className="hidden 2xl:flex items-center gap-2 text-[13px] font-medium whitespace-nowrap mr-2 opacity-90 hover:opacity-100"><StatusDot state={st.state} />{st.headline}</Link>
            <Link to={`${R}/join`} className={`hidden sm:inline-flex h-11 items-center px-5 rounded-[3px] border text-[14px] font-semibold transition ${solid ? 'border-ink/25 hover:bg-ink hover:text-paper' : 'border-paper/40 hover:bg-paper hover:text-ink'}`}>Join</Link>
            <Link to={`${R}/join#give`} className="inline-flex h-11 items-center px-5 rounded-[3px] bg-rust text-paper text-[14px] font-semibold hover:bg-rust-deep transition">Donate</Link>
            <button onClick={() => setOpen(true)} className={`xl:hidden h-11 w-11 grid place-items-center rounded-[3px] border ${solid ? 'border-ink/25' : 'border-paper/40'}`} aria-label="Open menu" aria-expanded={open}>
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M0 1h18M0 6h18M0 11h18" /></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      <div className={`fixed inset-0 z-[60] bg-ink text-paper transition-[opacity,visibility] duration-500 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="absolute inset-y-0 right-0 hidden lg:block w-[42%] overflow-hidden">
          {menuPhotos.map((p, i) => (
            <img key={p} src={img(p)} alt="" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hover === i ? 'opacity-70' : 'opacity-0'}`} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-site px-5 md:px-10 h-full flex flex-col">
          <div className="h-[120px] flex items-center justify-between">
            <Logo className="h-10" />
            <button onClick={() => setOpen(false)} className="h-11 px-5 rounded-[3px] border border-paper/30 text-sm font-semibold" aria-label="Close menu">Close</button>
          </div>
          <nav className="flex-1 flex flex-col justify-center gap-1 md:gap-2" aria-label="Menu">
            {mainNav.map((n, i) => (
              <Link key={n.to} to={n.to} onMouseEnter={() => setHover(i)} className="group flex items-baseline gap-5">
                <span className="eyebrow text-paper/40 w-8">0{i + 1}</span>
                <span className="display text-[44px] md:text-[72px] leading-[1.02] group-hover:text-brass transition-colors">{n.label}</span>
                <span className="hidden md:inline text-paper/50 text-sm opacity-0 group-hover:opacity-100 transition">{n.blurb}</span>
              </Link>
            ))}
          </nav>
          <div className="py-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-paper/60 border-t border-paper/10">
            <span>1010 Valley Street, Seattle</span><span>(206) 382-2628</span><span>Admission is always free</span>
            <Link to="/" className="underline">Compare with the original site</Link>
          </div>
        </div>
      </div>

      <main id="main">{children}</main>
      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer className="relative bg-ink text-paper overflow-hidden">
            <div className="relative mx-auto max-w-site px-5 md:px-10 pt-24 pb-10">
        <p className="eyebrow text-brass">Dick Wagner, founder</p>
        <p className="display text-[40px] sm:text-[56px] md:text-[80px] leading-[.95] mt-4 max-w-5xl">“Today Lake Union, tomorrow the world.”</p>

        <div className="mt-20 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo className="h-12" />
            <p className="mt-6 text-paper/70 max-w-sm leading-relaxed">A living museum of Pacific Northwest small craft, on the south shore of Lake Union since 1976. A registered 501(c)(3) nonprofit.</p>
            <form className="mt-8 flex max-w-sm rounded-[3px] bg-paper/10 p-1.5 focus-within:ring-2 ring-brass" onSubmit={(e) => { e.preventDefault(); window.open('https://www.cwb.org/enews', '_blank') }}>
              <label htmlFor="ft-email" className="sr-only">Email address</label>
              <input id="ft-email" type="email" required placeholder="Email address" className="flex-1 bg-transparent px-4 text-sm placeholder:text-paper/40 outline-none" />
              <button className="h-10 px-5 rounded-[3px] bg-brass text-ink text-sm font-semibold">Subscribe</button>
            </form>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-paper/40">Visit</p>
            <address className="not-italic mt-4 text-paper/80 leading-relaxed">1010 Valley Street<br />Seattle, WA 98109<br /><a href="tel:+12063822628" className="link-u">(206) 382-2628</a></address>
                      </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-paper/40">Explore</p>
            <ul className="mt-4 space-y-2 text-paper/80">{mainNav.map((n) => <li key={n.to}><Link className="link-u" to={n.to}>{n.label}</Link></li>)}</ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-paper/40">Belong</p>
            <ul className="mt-4 space-y-2 text-paper/80">
              <li><Link className="link-u" to={`${R}/join`}>Membership</Link></li>
              <li><Link className="link-u" to={`${R}/join#volunteer`}>Volunteer</Link></li>
              <li><Link className="link-u" to={`${R}/join#give`}>Ways to give</Link></li>
              <li><a className="link-u" href="https://www.cwb.org/boats-for-sale-1">Boats for sale</a></li>
              <li><a className="link-u" href="https://www.cwb.org/careers">Join our crew</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-paper/40">Follow</p>
            <ul className="mt-4 space-y-2 text-paper/80">
              <li><a className="link-u" href="https://www.instagram.com/centerforwoodenboats/">Instagram</a></li>
              <li><a className="link-u" href="https://www.facebook.com/centerforwoodenboats">Facebook</a></li>
              <li><a className="link-u" href="https://www.youtube.com/user/centerforwoodenboats">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-6 border-t border-paper/10 flex flex-wrap justify-between gap-4 text-xs text-paper/40">
          <span>© The Center for Wooden Boats, 1976–2026</span>
          <span>A design concept. <Link to="/" className="underline">See all three versions</Link></span>
        </div>
      </div>
    </footer>
  )
}
