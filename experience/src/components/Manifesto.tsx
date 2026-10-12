import { useEffect, useRef } from 'react'
import { gsap } from '../lib/scroll'

// Big statement that fills in word by word as you scroll, with small photographs
// set inline in the sentence like type.
type Token = string | { img: string; alt: string }

const TEXT: Token[] = [
  'Most', 'museums', 'ask', 'you', 'to', 'keep', 'your', 'hands', 'to', 'yourself.', 'Ours', 'hands', 'you', 'the', 'oars.',
  { img: 'img/livery-docks.webp', alt: 'Rowboats and sailboats tied up at the CWB livery docks' },
  'For', 'fifty', 'seasons', 'we', 'have', 'kept', 'a', 'fleet', 'of', 'wooden', 'boats', 'on', 'Lake', 'Union',
  { img: 'img/aerial.webp', alt: 'Aerial view of the CWB docks at the south end of Lake Union' },
  'and', 'kept', 'them', 'working.', 'Row', 'one.', 'Sail', 'one.', 'Build', 'one',
  { img: 'img/ribs.webp', alt: 'Two boatbuilders fitting the ribs of a wooden canoe' },
  'with', 'your', 'own', 'hands.',
]

export function Manifesto() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.mf-word',
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: { trigger: '.mf-text', start: 'top 78%', end: 'bottom 45%', scrub: 0.6 },
        },
      )
      gsap.fromTo(
        '.mf-pill',
        { width: 0, opacity: 0 },
        {
          width: (_: number, el: HTMLElement) => el.dataset.w + 'em',
          opacity: 1,
          ease: 'power2.out',
          stagger: 0.3,
          scrollTrigger: { trigger: '.mf-text', start: 'top 70%', end: 'bottom 55%', scrub: 0.8 },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section manifesto" ref={root}>
      <p className="eyebrow mf-eyebrow">A living museum · Since 1976</p>
      <p className="display mf-text">
        {TEXT.map((t, i) =>
          typeof t === 'string' ? (
            <span className="mf-word" key={i}>
              {t}{' '}
            </span>
          ) : (
            <span className="mf-pill" key={i} data-w={1.9}>
              <img src={t.img} alt={t.alt} loading="lazy" />
            </span>
          ),
        )}
      </p>
    </section>
  )
}
