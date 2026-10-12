// Opens the live CWB event inquiry form (hosted by Ravishing Radish) in an overlay on top of
// the current page, so planners never leave the site. Plain DOM so both the React comparison
// site and the immersive experience app can share it.
//
// The overlay and its iframe are built hidden shortly after the page loads, so the form is
// already loaded by the time anyone clicks. Opening is just a fade in. The iframe stays
// invisible until it has painted, behind a branded loading state, so there is no white flash.
export const INQUIRY_URL = 'https://ravishingradish.com/cwb-inquiry'

const isInquiryLink = (href: string) => /ravishingradish\.com\/cwb-?inquiry/i.test(href)

let overlay: HTMLDivElement | null = null
let isOpen = false
let lastFocus: HTMLElement | null = null
let prevOverflow = ''

function build() {
  if (overlay) return overlay
  const el = document.createElement('div')
  el.setAttribute('role', 'dialog')
  el.setAttribute('aria-modal', 'true')
  el.setAttribute('aria-label', 'Event rental inquiry')
  el.setAttribute('aria-hidden', 'true')
  el.style.cssText = 'position:fixed;inset:0;z-index:2147483000;background:rgba(8,20,28,.72);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:16px;cursor:auto;font-family:Archivo,Arial,sans-serif;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .22s ease,visibility 0s linear .22s'
  el.innerHTML = `
    <style>
      @keyframes cwbInqSweep{0%{transform:translateX(-100%)}100%{transform:translateX(250%)}}
      [data-cwb-inq-panel]{transform:translateY(12px) scale(.985);transition:transform .32s cubic-bezier(.2,.8,.2,1)}
      [data-cwb-inq-open] [data-cwb-inq-panel]{transform:none}
      @media (prefers-reduced-motion:reduce){[data-cwb-inq-panel]{transition:none}}
    </style>
    <div data-cwb-inq-panel style="position:relative;width:min(880px,100%);height:min(92vh,1100px);background:#0B1D29;border-radius:6px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 30px 80px rgba(0,0,0,.4)">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;background:#0B1D29;color:#fff">
        <div style="font-weight:700;font-size:15px;letter-spacing:.01em">Event rental inquiry</div>
        <div style="display:flex;align-items:center;gap:14px;font-size:13px">
          <a data-newtab href="${INQUIRY_URL}" target="_blank" rel="noreferrer" style="color:#F2B530;text-decoration:underline">Open in a new tab</a>
          <button data-close aria-label="Close" style="height:36px;padding:0 14px;border:1px solid rgba(255,255,255,.3);border-radius:3px;background:transparent;color:#fff;font-weight:600;cursor:pointer">Close</button>
        </div>
      </div>
      <div style="position:relative;flex:1;background:#0B1D29">
        <div data-loading style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;color:#fff;transition:opacity .3s ease">
          <div style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#F2B530">The Center for Wooden Boats</div>
          <div style="font-size:clamp(22px,3vw,30px);font-weight:800;font-stretch:112%;text-align:center;padding:0 24px">Host it on the water</div>
          <div style="position:relative;width:160px;height:2px;background:rgba(255,255,255,.15);overflow:hidden;border-radius:2px">
            <div style="position:absolute;inset:0;width:40%;background:#F2B530;animation:cwbInqSweep 1.1s ease-in-out infinite"></div>
          </div>
          <div style="font-size:13px;color:rgba(255,255,255,.65)">Getting the inquiry form ready</div>
        </div>
        <iframe title="Event rental inquiry form" src="${INQUIRY_URL}" style="position:relative;width:100%;height:100%;border:0;background:#fff;opacity:0;transition:opacity .3s ease" allow="clipboard-write"></iframe>
      </div>
    </div>`

  const frame = el.querySelector('iframe')!
  frame.addEventListener('load', () => {
    // Give the form a beat to paint its first frame before revealing it.
    setTimeout(() => {
      frame.style.opacity = '1'
      const l = el.querySelector('[data-loading]') as HTMLElement | null
      if (l) { l.style.opacity = '0'; setTimeout(() => l.remove(), 320) }
    }, 350)
  })
  el.addEventListener('click', (e) => {
    const t = e.target as HTMLElement
    if (t === el || t.closest('[data-close]')) closeInquiry()
  })
  document.body.appendChild(el)
  overlay = el
  return el
}

const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeInquiry() }

export function openInquiry() {
  const el = build()
  if (isOpen) return
  isOpen = true
  lastFocus = document.activeElement as HTMLElement | null
  prevOverflow = document.documentElement.style.overflow
  document.documentElement.style.overflow = 'hidden'
  el.setAttribute('aria-hidden', 'false')
  el.setAttribute('data-cwb-inq-open', '')
  el.style.transition = 'opacity .22s ease,visibility 0s'
  el.style.visibility = 'visible'
  el.style.pointerEvents = 'auto'
  el.style.opacity = '1'
  document.addEventListener('keydown', onKey)
  ;(el.querySelector('[data-close]') as HTMLElement).focus()
}

export function closeInquiry() {
  if (!overlay || !isOpen) return
  isOpen = false
  overlay.setAttribute('aria-hidden', 'true')
  overlay.removeAttribute('data-cwb-inq-open')
  overlay.style.transition = 'opacity .22s ease,visibility 0s linear .22s'
  overlay.style.opacity = '0'
  overlay.style.visibility = 'hidden'
  overlay.style.pointerEvents = 'none'
  document.documentElement.style.overflow = prevOverflow
  document.removeEventListener('keydown', onKey)
  lastFocus?.focus?.()
}

// Builds the hidden overlay once the page has settled, so the form loads in the background.
function preload() {
  const go = () => build()
  const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void }).requestIdleCallback
  const start = () => (ric ? ric(go, { timeout: 2500 }) : setTimeout(go, 1200))
  if (document.readyState === 'complete') start()
  else window.addEventListener('load', start, { once: true })
}

// Any link to the inquiry form, anywhere on the page, opens the overlay instead of navigating.
// Cmd/Ctrl-click still opens a real tab.
export function installInquiryLinks() {
  preload()
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
    const a = (e.target as HTMLElement).closest?.('a[href]') as HTMLAnchorElement | null
    if (!a || a.hasAttribute('data-newtab') || !isInquiryLink(a.href)) return
    e.preventDefault()
    openInquiry()
  })
}
