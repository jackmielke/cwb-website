// Local photography lives in /public/img. A relative base keeps it working on any host.
export const img = (name: string) => `${import.meta.env.BASE_URL}img/${name}`

// Squarespace CDN images from cwb.org can be resized with ?format=<width>w
// Where we hold a local copy of a cwb.org photo, serve it locally (faster, and works on hosts that block hotlinking).
const local: Record<string, string> = {
  '688IN90AZW96Y2X0DIVD': 'boathouse-harbor.jpg',
  '8RJZCM7VWZ2C1A3P7ED8': 'boathouse-harbor.jpg',
  '2TD61JCYKPH4380JBL10': 'aerial-slu.jpg',
  '67SYDHSFB6JYAXIAEKZX': 'wec-hanging-boats.jpg',
  'PYC25F1BKQDTUV7FFPG8': 'dinghy-sail.jpg',
  '0OZ53KIGFCBMVEDJNG5A': 'docks-skyline.jpg',
  'SOV900AM9O9PX27D4FRQ': 'sail-loft-event.jpg',
  '2PABOEWZ4FS2MUSTPKJN': 'boathouse-deck.jpg',
  '58S1H04GY2JCV3OSJTQ5': 'gallery-hall.jpg',
  'TX23TGMV7O8YEJEWOGX8': 'dock-wedding.jpg',
  'C79DEHN8JAO0W0VDUWWN': 'boathouse-lanterns.jpg',
}
export const sqs = (url: string, w = 1500) => {
  const hit = Object.keys(local).find((k) => url.includes(k))
  if (hit) return img(local[hit])
  return url.includes('squarespace-cdn.com') && !url.includes('format=') ? `${url}?format=${w}w` : url
}
