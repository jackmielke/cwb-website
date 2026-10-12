// Pulls full-resolution copies of the cwb.org photos we serve locally, at build time.
// Squarespace resizes on request (?format=2500w). The repo keeps 1500px copies as a
// fallback, so if the CDN can't be reached the build still succeeds with those.
import sharp from 'sharp'
import { stat } from 'node:fs/promises'

const SQS = 'https://images.squarespace-cdn.com/content/v1/5c48db894eddeca43abfade1/'
const MAX = 2400

// source photo -> local files it feeds (format follows the extension)
const PHOTOS = {
  '1648754628305-688IN90AZW96Y2X0DIVD/RAD02665.jpg': ['public/img/boathouse-harbor.jpg', 'public/experience/img/hero.jpg'],
  '1621977051611-2TD61JCYKPH4380JBL10/20190928-DJI_0011.jpg': ['public/img/aerial-slu.jpg', 'public/experience/img/aerial.webp'],
  '1655323260223-67SYDHSFB6JYAXIAEKZX/CWB_SouthLakeUnion_PhotobyMikelAmias1.jpg': ['public/img/wec-hanging-boats.jpg', 'public/experience/img/wagner-boats.webp'],
  '1655323213795-PYC25F1BKQDTUV7FFPG8/CWB_SouthLakeUnion_2019Regatta-ByDavidMillar1.jpg': ['public/img/dinghy-sail.jpg', 'public/experience/img/sailing.webp'],
  '1555108779615-0OZ53KIGFCBMVEDJNG5A/WECGrandOpening_3.24.19_SandyLam002.jpg': ['public/img/docks-skyline.jpg'],
  '1555110673611-2PABOEWZ4FS2MUSTPKJN/gallery_North.jpg': ['public/img/boathouse-deck.jpg', 'public/experience/img/boathouse-deck.webp'],
  '1555110677387-58S1H04GY2JCV3OSJTQ5/WECGrandOpening_3.24.19_SandyLam159.jpg': ['public/img/gallery-hall.jpg', 'public/experience/img/gallery-hall.webp'],
  "1663265238487-TX23TGMV7O8YEJEWOGX8/max+and+kristen%27s+wedding+07-23-2022-49_websize.jpg": ['public/img/dock-wedding.jpg', 'public/experience/img/wedding-dock.webp'],
  '1662509587221-SOV900AM9O9PX27D4FRQ/SailLoft8.jpg': ['public/img/sail-loft-event.jpg', 'public/experience/img/sail-loft.webp'],
}

async function fetchPhoto(path) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 20000)
  try {
    const r = await fetch(`${SQS}${path}?format=2500w`, { signal: ctrl.signal })
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    return Buffer.from(await r.arrayBuffer())
  } finally {
    clearTimeout(t)
  }
}

let upgraded = 0
await Promise.all(
  Object.entries(PHOTOS).map(async ([path, outs]) => {
    let buf
    try {
      buf = await fetchPhoto(path)
    } catch (e) {
      console.warn(`[hires] kept fallback for ${path.split('/')[1]}: ${e.message}`)
      return
    }
    for (const out of outs) {
      const cur = await sharp(out).metadata().catch(() => ({ width: 0, height: 0 }))
      const src = await sharp(buf).metadata()
      if (Math.max(src.width, src.height) <= Math.max(cur.width ?? 0, cur.height ?? 0)) continue
      // Keep the local crop's aspect so anything aligned to it (like the hero water mask) still lines up.
      const aspect = cur.width && cur.height ? cur.width / cur.height : src.width / src.height
      let w = Math.min(MAX, src.width)
      let h = Math.round(w / aspect)
      if (h > src.height || h > MAX) {
        h = Math.min(MAX, src.height)
        w = Math.round(h * aspect)
      }
      const img = sharp(buf).rotate().resize(w, h, { fit: 'cover', position: 'centre' })
      const pipe = out.endsWith('.webp') ? img.webp({ quality: 80 }) : img.jpeg({ quality: 82, mozjpeg: true, progressive: true })
      await pipe.toFile(out + '.tmp')
      const { rename } = await import('node:fs/promises')
      await rename(out + '.tmp', out)
      const { size } = await stat(out)
      console.log(`[hires] ${out} -> ${w}x${h} (${Math.round(size / 1024)} KB)`)
      upgraded++
    }
  }),
)
console.log(`[hires] ${upgraded} photo(s) upgraded`)
