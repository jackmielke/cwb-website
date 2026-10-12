import { useState } from 'react'
import { INQUIRY_URL } from '../lib/inquiry'

// The live Ravishing Radish inquiry form, embedded in the page. It loads as soon as the page
// does and stays hidden behind a navy loading panel until it has painted, so it never flashes white.
export function InquiryEmbed({ height = 1500, className = '' }: { height?: number; className?: string }) {
  const [ready, setReady] = useState(false)
  return (
    <div className={`relative overflow-hidden bg-[#0B1D29] ${className}`} style={{ height }}>
      <div
        aria-hidden={ready}
        className={`absolute inset-x-0 top-0 h-[420px] flex flex-col items-center justify-center gap-4 text-white transition-opacity duration-300 ${ready ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <p className="text-[12px] font-bold uppercase tracking-[.14em] text-[#F2B530]">Event rental inquiry</p>
        <div className="relative h-[2px] w-40 overflow-hidden rounded bg-white/15">
          <div className="absolute inset-y-0 w-2/5 bg-[#F2B530] animate-[cwbSweep_1.1s_ease-in-out_infinite]" />
        </div>
        <p className="text-[13px] text-white/65">Getting the form ready</p>
      </div>
      <iframe
        title="Event rental inquiry form"
        src={INQUIRY_URL}
        onLoad={() => setTimeout(() => setReady(true), 350)}
        className={`relative block h-full w-full border-0 bg-white transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}
        allow="clipboard-write"
      />
      <style>{'@keyframes cwbSweep{0%{transform:translateX(-100%)}100%{transform:translateX(250%)}}'}</style>
    </div>
  )
}
