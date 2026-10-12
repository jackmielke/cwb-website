import { useEffect, useState } from 'react'
import { status, type Status } from '../../lib/hours'

export function useStatus() {
  const [s, setS] = useState<Status>(() => status())
  useEffect(() => { const t = setInterval(() => setS(status()), 60_000); return () => clearInterval(t) }, [])
  return s
}

export function StatusDot({ state }: { state: Status['state'] }) {
  const c = state === 'open' ? 'bg-emerald-400' : state === 'closing-soon' ? 'bg-brass' : 'bg-rust-light'
  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      {state !== 'closed' && <span className={`absolute inset-0 rounded-full ${c} opacity-60 animate-ping`} />}
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${c}`} />
    </span>
  )
}
