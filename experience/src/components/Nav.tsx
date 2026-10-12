import { useEffect, useState } from 'react'
import { goToPage, ScrollTrigger, scrollToTarget } from '../lib/scroll'
import { hrefFor, type Page } from '../lib/route'
import { soundOff, soundOn } from '../lib/sound'
import { WaterButton } from './WaterButton'

const LINKS = [
  { href: '#fleet', label: 'On the water' },
  { href: 'route:programs', label: 'Learn & build' },
  { href: 'route:calendar', label: "What's on" },
  { href: 'route:visit', label: 'Visit free' },
  { href: 'route:about', label: 'About' },
]

export function Nav() {
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [sound, setSound] = useState(false)

  useEffect(() => {
    let lastY = 0
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll()
        setSolid(y > window.innerHeight * 0.85)
        setHidden(y > lastY && y > window.innerHeight * 0.6)
        lastY = y
      },
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const toggleSound = () => {
    if (sound) soundOff()
    else soundOn()
    setSound(!sound)
  }

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    if (href.startsWith('route:')) goToPage(href.slice(6) as Page)
    else scrollToTarget(href)
  }

  return (
    <>
      <header className={`nav ${solid ? 'is-solid' : ''} ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}>
        <a href="./" className="nav-logo" onClick={go('route:home')} aria-label="The Center for Wooden Boats, home">
          <img src="img/cwb-logo.png" alt="The Center for Wooden Boats" width={150} height={54} />
        </a>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href.startsWith('route:') ? hrefFor(l.href.slice(6) as Page) : l.href} onClick={go(l.href)} className="wlink">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className={`sound ${sound ? 'is-on' : ''}`} onClick={toggleSound} aria-pressed={sound} data-cursor={sound ? 'Hush' : 'Listen'}>
            <span className="sound-bars" aria-hidden="true">
              <i /><i /><i /><i />
            </span>
            <span className="sound-label">{sound ? 'Sound on' : 'Sound'}</span>
          </button>
          <span className="nav-hide-sm">
            <WaterButton href="#spaces" variant={solid ? 'dark' : 'light'} small arrow={false}>
              Event rentals
            </WaterButton>
          </span>
          <WaterButton href="route:donate" variant="solid" small arrow={false}>
            Donate
          </WaterButton>
          <button className="nav-burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="menu-inner">
          {[...LINKS, { href: '#spaces', label: 'Event rentals' }, { href: '#keep', label: 'Join' }, { href: 'route:donate', label: 'Donate' }].map((l, i) => (
            <a key={l.href} href={l.href.startsWith('route:') ? hrefFor(l.href.slice(6) as Page) : l.href} onClick={go(l.href)} style={{ ['--i' as string]: i }} className="display">
              {l.label}
            </a>
          ))}
          <p className="eyebrow menu-foot">1010 Valley Street · Seattle · Admission always free</p>
        </div>
      </div>
    </>
  )
}
