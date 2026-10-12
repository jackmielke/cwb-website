import { useCallback, useEffect, useState } from 'react'
import { initScroll, ScrollTrigger } from './lib/scroll'
import { Preloader } from './components/Preloader'
import { Nav } from './components/Nav'
import { Cursor } from './components/Cursor'
import { Hero } from './components/Hero'
import { Manifesto } from './components/Manifesto'
import { Fleet } from './components/Fleet'
import { ThreeWays } from './components/ThreeWays'
import { Conditions } from './components/Conditions'
import { FiftySeasons } from './components/FiftySeasons'
import { FreeDoor } from './components/FreeDoor'
import { Spaces } from './components/Spaces'
import { Keep } from './components/Keep'
import { Notices } from './components/Notices'
import { Landmark } from './components/Landmark'
import { Footer } from './components/Footer'
import { Donate } from './components/Donate'
import { About, Calendar, Programs, Visit } from './components/Pages'
import { currentPage, onRoute, type Page } from './lib/route'

export default function App() {
  const [started, setStarted] = useState(false)
  const onDone = useCallback(() => setStarted(true), [])
  const [page, setPage] = useState<Page>(currentPage)

  useEffect(() => onRoute(setPage), [])

  useEffect(() => {
    const names: Record<Page, string> = { home: '', visit: 'Visit', programs: 'Learn and build', calendar: "What's on", about: 'About', donate: 'Give' }
    document.title = page === 'home' ? 'The Center for Wooden Boats · Take it out on the water' : `${names[page]} · The Center for Wooden Boats`
  }, [page])

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    initScroll()
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <Preloader onDone={onDone} />
      <Cursor />
      <Nav />
      {page === 'donate' ? (
        <Donate />
      ) : page === 'visit' ? (
        <Visit />
      ) : page === 'programs' ? (
        <Programs />
      ) : page === 'calendar' ? (
        <Calendar />
      ) : page === 'about' ? (
        <About />
      ) : (
        <main>
          <Hero started={started} />
          <Manifesto />
          <Notices />
          <Fleet />
          <ThreeWays />
          <Conditions />
          <FiftySeasons />
          <Landmark />
          <FreeDoor />
          <Spaces />
          <Keep />
        </main>
      )}
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
