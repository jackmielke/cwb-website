import type { ReactNode, MouseEvent } from 'react'
import { goToPage, scrollToTarget } from '../lib/scroll'
import { hrefFor, type Page } from '../lib/route'

// One link for everything: "route:visit" pages, "#section" anchors, or outside URLs.
export function Link({ to, children, className, cursor }: { to: string; children: ReactNode; className?: string; cursor?: string }) {
  const route = to.startsWith('route:') ? (to.slice(6) as Page) : null
  const hash = to.startsWith('#')
  const onClick = (e: MouseEvent) => {
    if (route) {
      e.preventDefault()
      goToPage(route)
    } else if (hash) {
      e.preventDefault()
      scrollToTarget(to)
    }
  }
  return (
    <a
      href={route ? hrefFor(route) : to}
      onClick={onClick}
      className={className}
      data-cursor={cursor}
      {...(!route && !hash ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
