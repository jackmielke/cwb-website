import type { ReactNode, MouseEvent } from 'react'
import { goToPage, scrollToTarget } from '../lib/scroll'
import { hrefFor, type Page } from '../lib/route'

type Props = {
  href: string
  children: ReactNode
  variant?: 'light' | 'solid' | 'dark'
  small?: boolean
  arrow?: boolean
  external?: boolean
}

// The fill rises like a waterline, with a moving wave on its surface.
export function WaterButton({ href, children, variant = 'light', small, arrow = true, external }: Props) {
  const isHash = href.startsWith('#')
  const route = href.startsWith('route:') ? (href.slice(6) as Page) : null
  const onClick = (e: MouseEvent) => {
    if (route) {
      e.preventDefault()
      goToPage(route)
    } else if (isHash) {
      e.preventDefault()
      scrollToTarget(href)
    }
  }
  return (
    <a
      href={route ? hrefFor(route) : href}
      onClick={onClick}
      className={`wbtn wbtn--${variant} ${small ? 'wbtn--small' : ''}`}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <span className="wbtn-water" aria-hidden="true">
        <span />
      </span>
      <span>{children}</span>
      {arrow && (
        <svg className="wbtn-arrow" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M2 9h13M10 4l5 5-5 5" />
        </svg>
      )}
    </a>
  )
}

