import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`inline-block transition-transform group-hover:translate-x-1 ${className}`} width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M0 5h16M12 1l4 4-4 4" />
    </svg>
  )
}

type BtnProps = { to?: string; href?: string; children: ReactNode; variant?: 'rust' | 'ink' | 'ghost' | 'ghost-light' | 'paper'; className?: string }
export function Btn({ to, href, children, variant = 'rust', className = '' }: BtnProps) {
  const v = {
    rust: 'bg-rust text-paper hover:bg-rust-deep',
    ink: 'bg-ink text-paper hover:bg-ink-2',
    paper: 'bg-paper text-ink hover:bg-white',
    ghost: 'border border-ink/25 text-ink hover:bg-ink hover:text-paper',
    'ghost-light': 'border border-paper/40 text-paper hover:bg-paper hover:text-ink',
  }[variant]
  const cls = `group inline-flex h-12 items-center gap-3 rounded-[3px] px-6 text-[15px] font-semibold transition ${v} ${className}`
  if (to) return <Link to={to} className={cls}>{children} <Arrow /></Link>
  return <a href={href} className={cls}>{children} <Arrow /></a>
}

export function PageHero({ eyebrow, title, intro, image, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; image: string; children?: ReactNode }) {
  return (
    <section className="relative min-h-[78vh] flex items-end overflow-hidden bg-ink text-paper grain">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover animate-kenburns" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/70 to-transparent" />
      <div className="relative mx-auto max-w-site w-full px-5 md:px-10 pb-16 pt-40">
        <Eyebrow className="text-brass animate-rise">{eyebrow}</Eyebrow>
        <h1 className="display mt-5 text-[52px] sm:text-[76px] md:text-[104px] leading-[.92] max-w-5xl animate-rise [animation-delay:.1s]">{title}</h1>
        {intro && <div className="mt-8 max-w-2xl text-lg md:text-xl text-paper/80 leading-relaxed animate-rise [animation-delay:.2s]">{intro}</div>}
        {children && <div className="mt-10 animate-rise [animation-delay:.3s]">{children}</div>}
      </div>
    </section>
  )
}

export function Section({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`relative ${className}`}><div className="mx-auto max-w-site px-5 md:px-10">{children}</div></section>
}
