import { useEffect, useState } from 'react'
import { LIVE } from '../lib/content'

// Two pieces of news the current site leads with: the Landmark designation and the BBC film.
export function Landmark() {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPlaying(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [playing])

  return (
    <section className="section landmark" id="landmark">
      <div className="lm-grid">
        <article className="lm-plaque-wrap">
          <p className="eyebrow">City of Seattle</p>
          <a className="lm-plaque" href={LIVE.landmark} target="_blank" rel="noreferrer" data-cursor="Read">
            <span className="lm-shine" aria-hidden="true" />
            <span className="eyebrow lm-p-top">Designated Seattle Landmark</span>
            <span className="display lm-p-title">The Center for Wooden Boats</span>
            <span className="lm-p-rule" aria-hidden="true" />
            <span className="lm-p-body">
              The floating structures of Waterway 4 at South Lake Union, and the Old Boathouse, the Wagner Floating Home.
            </span>
          </a>
          <p className="lm-copy">
            Thanks to everyone who wrote to the Board and testified at the hearings, to Sarah Martin for her research, and
            to{' '}
            <a className="wlink" href={LIVE.fourCulture} target="_blank" rel="noreferrer">4Culture</a> for supporting the
            application.
          </p>
          <a className="wlink lm-more" href={LIVE.landmark} target="_blank" rel="noreferrer">
            What the designation means
          </a>
        </article>

        <article className="lm-film">
          <p className="eyebrow">BBC StoryWorks · In Pursuit of Wellness</p>
          <button className="lm-poster" onClick={() => setPlaying(true)} data-cursor="Play" data-cursor-theme="light">
            <img src="img/aerial.webp" alt="The Center for Wooden Boats from above, on Lake Union" loading="lazy" />
            <span className="lm-play" aria-hidden="true">
              <i />
              <i />
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </span>
            <span className="lm-dur eyebrow">Trailer · 1 min</span>
          </button>
          <h3 className="display lm-title">
            The shape of <em>water.</em>
          </h3>
          <p className="lm-copy">
            A short film on how CWB and its Olson Kundig building support wellbeing, made with the Global Wellness
            Institute.
          </p>
          <a className="wlink lm-more" href={LIVE.film} target="_blank" rel="noreferrer">
            Watch the full five-minute film
          </a>
        </article>
      </div>

      {playing && (
        <div className="lm-modal" role="dialog" aria-label="BBC StoryWorks trailer" onClick={() => setPlaying(false)}>
          <div className="lm-frame" onClick={(e) => e.stopPropagation()}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/UkOdHtuz7_Q?autoplay=1&rel=0"
              title="BBC StoryWorks: The Center for Wooden Boats"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
          <button className="lm-close eyebrow" onClick={() => setPlaying(false)}>Close</button>
        </div>
      )}
    </section>
  )
}
