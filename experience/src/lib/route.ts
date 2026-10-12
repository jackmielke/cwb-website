// A two-page router: the waterfront (home) and the donate page.
// Paths stay relative-friendly so the build also works from a subfolder.
export type Page = 'home' | 'donate'

const listeners = new Set<(p: Page) => void>()

export function currentPage(): Page {
  return /\/donate\/?$/.test(location.pathname) || location.hash === '#/donate' ? 'donate' : 'home'
}

function hrefFor(page: Page) {
  const base = location.pathname.replace(/\/donate\/?$/, '/').replace(/[^/]*$/, '')
  return page === 'donate' ? `${base}donate` : base
}

export function navigate(page: Page) {
  if (page === currentPage()) return
  try {
    history.pushState({}, '', hrefFor(page))
  } catch {
    location.hash = page === 'donate' ? '#/donate' : ''
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
