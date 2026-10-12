// Opens the live CWB event inquiry form (hosted by Ravishing Radish) in an overlay on top of
// the current page, so planners never leave the site. Plain DOM so both the React comparison
// site and the immersive experience app can share it.
export const INQUIRY_URL = 'https://ravishingradish.com/cwb-inquiry'

const isInquiryLink = (href: string) => /ravishingradish\.com\/cwb-?inquiry/i.test(href)

let overlay: HTMLDivElement | null = null

export function openInquiry() {
  if (overlay) return
  const lastFocus = document.activeElement as HTMLElement | null
  const prevOverflow = document.documentElement.style.overflow
  document.documentElement.style.overflow = 'hidden'

  overlay = document.createElement('div')
  overlay.setAttribute('role', 'dialog')
  overlay.setAttribute('aria-modal', 'true')
  overlay.setAttribute('aria-label', 'Event rental inquiry')
  overlay.style.cssText = 'position:fixed;inset:0;z-index:2147483000;background:rgba(8,20,28,.72);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:16px;cursor:auto;font-family:Archivo,Arial,sans-serif'
  overlay.innerHTML = `
    <div style="position:relative;width:min(880px,100%);height:min(92vh,1100px);background:#fff;border-radius:6px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 30px 80px rgba(0,0,0,.4)">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;border-bottom:1px solid #e3e7ea;color:#0B1D29">
        <div style="font-weight:700;font-size:15px">Event rental inquiry</div>
        <div style="display:flex;align-items:center;gap:14px;font-size:13px">
          <a data-newtab href="${INQUIRY_URL}" target="_blank" rel="noreferrer" style="color:#AD4E25;text-decoration:underline">Open in a new tab</a>
          <button data-close aria-label="Close" style="height:36px;padding:0 14px;border:1px solid #c9d1d6;border-radius:3px;background:#fff;color:#0B1D29;font-weight:600;cursor:pointer">Close</button>
        </div>
      </div>
      <div style="position:relative;flex:1;background:#f4f6f7">
        <p data-loading style="position:absolute;inset:0;display:grid;place-items:center;margin:0;color:#46596A;font-size:14px">Loading the inquiry form…</p>
        <iframe title="Event rental inquiry form" src="${INQUIRY_URL}" style="position:relative;width:100%;height:100%;border:0;background:transparent" allow="clipboard-write"></iframe>
      </div>
    </div>`

  const close = () => {
    if (!overlay) return
    overlay.remove(); overlay = null
    document.documentElement.style.overflow = prevOverflow
    document.removeEventListener('keydown', onKey)
    lastFocus?.focus?.()
  }
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
  overlay.addEventListener('click', (e) => {
    const t = e.target as HTMLElement
    if (t === overlay || t.closest('[data-close]')) close()
  })
  overlay.querySelector('iframe')!.addEventListener('load', () => overlay?.querySelector('[data-loading]')?.remove())
  document.addEventListener('keydown', onKey)
  document.body.appendChild(overlay)
  ;(overlay.querySelector('[data-close]') as HTMLElement).focus()
}

// Any link to the inquiry form, anywhere on the page, opens the overlay instead of navigating.
// Cmd/Ctrl-click still opens a real tab.
export function installInquiryLinks() {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
    const a = (e.target as HTMLElement).closest?.('a[href]') as HTMLAnchorElement | null
    if (!a || a.hasAttribute('data-newtab') || !isInquiryLink(a.href)) return
    e.preventDefault()
    openInquiry()
  })
}
