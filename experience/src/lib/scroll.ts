import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { currentPage, navigate, type Page } from './route'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis: Lenis | null = null

export function initScroll() {
  if (lenis || prefersReducedMotion) return lenis
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function getLenis() {
  return lenis
}

/** Jump instantly, with ScrollTrigger brought up to date. */
export function jumpTo(y: number | HTMLElement) {
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true })
  else if (typeof y === 'number') window.scrollTo(0, y)
  else y.scrollIntoView()
  ScrollTrigger.update()
}

// A tide that washes over the page so long jumps don't scrub through every animation.
function tide(midway: () => void) {
  let veil = document.querySelector<HTMLDivElement>('.tide')
  if (!veil) {
    veil = document.createElement('div')
    veil.className = 'tide'
    veil.setAttribute('aria-hidden', 'true')
    document.body.appendChild(veil)
  }
  const v = veil
  gsap.killTweensOf(v)
  gsap
    .timeline()
    .set(v, { display: 'block', clipPath: 'inset(100% 0 0 0)' })
    .to(v, { clipPath: 'inset(0% 0 0 0)', duration: 0.45, ease: 'power3.in' })
    .add(midway)
    .to(v, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'power3.out', delay: 0.08 })
    .set(v, { display: 'none' })
}

export function goToPage(page: Page) {
  if (page === currentPage()) {
    if (window.scrollY < window.innerHeight * 1.6) lenis ? lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: 'smooth' })
    else tide(() => jumpTo(0))
    return
  }
  tide(() => {
    navigate(page)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        jumpTo(0)
        ScrollTrigger.refresh()
      }),
    )
  })
}

export function scrollToTarget(target: string | HTMLElement) {
  if (typeof target === 'string' && currentPage() !== 'home') {
    tide(() => {
      navigate('home')
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const el = document.querySelector<HTMLElement>(target)
          ScrollTrigger.refresh()
          if (el) jumpTo(el)
        }),
      )
    })
    return
  }
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (!el) return
  const distance = Math.abs(el.getBoundingClientRect().top)
  if (lenis && distance > window.innerHeight * 1.6) {
    lenis.stop()
    tide(() => {
      lenis?.start()
      jumpTo(el)
    })
  } else if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 })
  else el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
}

export { gsap, ScrollTrigger }
