import type { BoatKind } from '../lib/content'

// Line drawings in the spirit of a naval architect's profile plan.
// viewBox 0 0 400 220, design waterline at y = 150.

type Part = { d: string; cls?: string }

const PARTS: Record<BoatKind, Part[]> = {
  knockabout: [
    { d: 'M60 119 C150 114 260 111 350 103 C345 116 336 129 326 136 C280 143 150 143 80 134 Z', cls: 'hull' },
    { d: 'M235 141 L226 171 L176 171 L166 142', cls: 'hull' },
    { d: 'M84 134 L86 159 Q90 163 98 160 L100 136' },
    { d: 'M235 111 L235 11' },
    { d: 'M235 98 L98 100' },
    { d: 'M235 15 Q170 52 100 98 L235 97 Z', cls: 'sail' },
    { d: 'M234 31 L344 104 Q300 98 262 100 Z', cls: 'sail' },
    { d: 'M235 11 L64 118', cls: 'rig' },
  ],
  peapod: [
    { d: 'M40 128 C120 138 280 138 360 128 C350 146 330 160 300 165 C230 172 170 172 100 165 C70 160 50 146 40 128 Z', cls: 'hull' },
    { d: 'M40 128 C36 120 34 114 36 108 M360 128 C364 120 366 114 364 108' },
    { d: 'M170 132 L82 186', cls: 'rig' },
    { d: 'M230 132 L318 186', cls: 'rig' },
    { d: 'M76 182 Q66 192 72 196 Q82 194 88 186 Z', cls: 'sail' },
    { d: 'M324 182 Q334 192 328 196 Q318 194 312 186 Z', cls: 'sail' },
    { d: 'M150 134 L250 134' },
  ],
  catboat: [
    { d: 'M50 128 C150 134 260 132 352 118 C348 136 334 150 312 156 C220 166 130 164 72 156 L50 128 Z', cls: 'hull' },
    { d: 'M60 130 L64 168 Q72 174 84 168 L82 140' },
    { d: 'M318 124 L318 18' },
    { d: 'M318 116 L316 44 L222 16 L92 114 Z', cls: 'sail' },
    { d: 'M318 116 L90 116' },
    { d: 'M150 132 L148 120 L210 118 L212 132' },
  ],
  eltoro: [
    { d: 'M130 132 L292 128 L288 148 Q262 162 214 162 L148 160 Q132 150 130 132 Z', cls: 'hull' },
    { d: 'M130 132 L126 126 M292 128 L296 122' },
    { d: 'M248 130 L248 36' },
    { d: 'M248 40 L248 122 L150 122 Z', cls: 'sail' },
    { d: 'M140 140 L136 176 Q140 182 148 178 L150 150' },
  ],
  canoe: [
    { d: 'M24 118 C38 140 80 152 200 154 C320 152 362 140 376 118 C340 132 60 132 24 118 Z', cls: 'hull' },
    { d: 'M24 118 Q20 110 26 104 M376 118 Q380 110 374 104' },
    { d: 'M262 66 L292 160', cls: 'rig' },
    { d: 'M288 150 Q286 176 300 188 Q306 174 298 148 Z', cls: 'sail' },
    { d: 'M150 134 L150 140 M250 134 L250 140' },
  ],
  skiff: [
    { d: 'M64 124 L334 118 C330 136 316 150 296 156 L84 156 L64 124 Z', cls: 'hull' },
    { d: 'M64 122 L52 122 L48 172 L56 176 L66 132', cls: 'hull' },
    { d: 'M200 120 L200 96 L236 96 L240 120' },
    { d: 'M210 96 L212 72 L226 72' },
    { d: 'M110 122 Q200 140 330 120', cls: 'rig' },
  ],
  launch: [
    { d: 'M30 128 C150 134 300 132 372 110 C364 136 346 154 316 160 L62 160 L30 128 Z', cls: 'hull' },
    { d: 'M118 130 L118 90 L250 86 L262 128', cls: 'hull' },
    { d: 'M136 98 L162 98 L162 114 L136 114 Z M176 97 L202 97 L202 113 L176 113 Z M216 96 L240 96 L242 112 L216 112 Z' },
    { d: 'M110 90 L258 84' },
    { d: 'M290 112 L290 52 L312 58 L290 64', cls: 'rig' },
    { d: 'M40 132 L36 154' },
  ],
}

export function BoatDrawing({ kind, className }: { kind: BoatKind; className?: string }) {
  return (
    <svg className={`boat-drawing ${className ?? ''}`} viewBox="0 0 400 220" aria-hidden="true">
      <g className="bd-grid">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={'s' + i} x1={40 + i * 40} y1={20} x2={40 + i * 40} y2={200} />
        ))}
        {[130, 140, 150, 160].map((y) => (
          <line key={'w' + y} x1={10} y1={y} x2={390} y2={y} />
        ))}
      </g>
      <line className="bd-wl" x1={0} y1={150} x2={400} y2={150} />
      <g className="bd-lines">
        {PARTS[kind].map((p, i) => (
          <path key={i} d={p.d} className={p.cls} pathLength={1} style={{ ['--i' as string]: i }} />
        ))}
      </g>
      <text className="bd-label" x={392} y={146} textAnchor="end">
        DWL
      </text>
    </svg>
  )
}
