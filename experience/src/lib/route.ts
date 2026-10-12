// A small path router: the waterfront (home) plus a handful of inner pages.
// Paths stay relative-friendly so the build also works from a subfolder.
export const PAGES = ['home', 'visit', 'programs', 'calendar', 'about', 'donate'] as const
export type Page = (typeof PAGES)[number]

const listeners = new Set<(p: Page) => void>()
const INNER = PAGES.filter((p) => p !== 'home').join('|')
const TAIL = new RegExp(`/(${INNER})/?$`)

export function currentPage(): Page {
  const m = location.pathname.match(TAIL) ?? location.hash.match(new RegExp(`^#/(${INNER})$`))
  return (m?.[1] as Page) ?? 'home'
}

export function hrefFor(page: Page) {
  return page === 'home' ? './' : page
}

function absFor(page: Page) {
  const base = location.pathname.replace(TAIL, '/').replace(/[^/]*$/, '')
  return page === 'home' ? base : `${base}${page}`
}

export function navigate(page: Page) {
  if (page === currentPage()) return
  try {
    history.pushState({}, '', absFor(page))
  } catch {
    location.hash = page === 'home' ? '' : `#/${page}`
  }
  listeners.forEach((fn) => fn(page))
}

export function onRoute(fn: (p: Page) => void) {
  listeners.add(fn)
  const pop = () => fn(currentPage())
  window.addEventListener('popstate', pop)
  window.addEventListener('hashchange', pop)
  return () => {
    listeners.delete(fn)
    window.removeEventListener('popstate', pop)
    window.removeEventListener('hashchange', pop)
  }
}
