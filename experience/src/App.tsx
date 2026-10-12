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
import { Footer } from './components/Footer'
import { Donate } from './components/Donate'
import { currentPage, onRoute, type Page } from './lib/route'

export default function App() {
  const [started, setStarted] = useState(false)
  const onDone = useCallback(() => setStarted(true), [])
  const [page, setPage] = useState<Page>(currentPage)

  useEffect(() => onRoute(setPage), [])

  useEffect(() => {
    document.title = page === 'donate' ? 'Give · The Center for Wooden Boats' : 'The Center for Wooden Boats · Take it out on the water'
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
      ) : (
        <main>
          <Hero started={started} />
          <Manifesto />
          <Fleet />
          <ThreeWays />
          <Conditions />
          <FiftySeasons />
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
