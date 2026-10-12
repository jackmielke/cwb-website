// CWB's published 2026-27 seasonal schedule (cwb.org/hourslocations). Open Wednesday through Sunday.
// One source of truth for every "open now" badge on the reimagined site.

type Season = { from: string; to: string; open: string; close: string; rentals: boolean; label: string }

export const seasons: Season[] = [
  { from: '2026-01-03', to: '2026-03-13', open: '10:00', close: '16:00', rentals: false, label: 'Winter' },
  { from: '2026-03-14', to: '2026-04-15', open: '11:30', close: '19:00', rentals: true, label: 'Spring' },
  { from: '2026-04-16', to: '2026-09-06', open: '12:30', close: '20:00', rentals: true, label: 'Summer' },
  { from: '2026-09-07', to: '2026-10-11', open: '11:30', close: '19:00', rentals: true, label: 'Autumn' },
  { from: '2026-10-12', to: '2027-03-19', open: '10:00', close: '16:00', rentals: false, label: 'Winter' },
  { from: '2027-03-20', to: '2027-12-31', open: '11:30', close: '19:00', rentals: true, label: 'Spring' },
]

export const closures: { from: string; to: string; reason: string }[] = [
  { from: '2026-05-27', to: '2026-05-27', reason: 'the day after Memorial Day' },
  { from: '2026-07-04', to: '2026-07-04', reason: 'Independence Day' },
  { from: '2026-09-09', to: '2026-09-09', reason: 'the day after Labor Day' },
  { from: '2026-10-12', to: '2026-10-20', reason: 'the TWSBA small boats conference' },
  { from: '2026-11-26', to: '2026-11-26', reason: 'Thanksgiving' },
  { from: '2026-12-14', to: '2027-01-02', reason: 'the winter holiday' },
]

const OPEN_DAYS = [0, 3, 4, 5, 6] // Sun, Wed, Thu, Fri, Sat

// Current wall-clock time in Seattle, regardless of the viewer's timezone.
export function seattleNow(d = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, weekday: 'short',
  }).formatToParts(d)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const iso = `${get('year')}-${get('month')}-${get('day')}`
  const minutes = (parseInt(get('hour')) % 24) * 60 + parseInt(get('minute'))
  return { iso, minutes }
}

const toMin = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m }
export const fmt = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  const hh = ((h + 11) % 12) + 1
  return `${hh}${m ? ':' + String(m).padStart(2, '0') : ''}${h < 12 ? 'am' : 'pm'}`
}
const addDays = (iso: string, n: number) => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10) }
const dow = (iso: string) => new Date(iso + 'T12:00:00Z').getUTCDay()
const prettyDay = (iso: string) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'UTC' })

export function dayInfo(iso: string) {
  const season = seasons.find((s) => iso >= s.from && iso <= s.to)
  const closure = closures.find((c) => iso >= c.from && iso <= c.to)
  const openDay = OPEN_DAYS.includes(dow(iso))
  return { season, closure, isOpen: !!season && !closure && openDay }
}

export type Status = {
  state: 'open' | 'closing-soon' | 'closed'
  headline: string
  detail: string
  rentals: boolean
}

export function status(d = new Date()): Status {
  const { iso, minutes } = seattleNow(d)
  const today = dayInfo(iso)
  if (today.isOpen && today.season) {
    const o = toMin(today.season.open), c = toMin(today.season.close)
    const lastBoat = c - 90
    if (minutes >= o && minutes < c) {
      const boat = today.season.rentals ? (minutes < lastBoat ? ` · Last boat out ${fmt(`${Math.floor(lastBoat / 60)}:${String(lastBoat % 60).padStart(2, '0')}`)}` : ' · Livery closed for the day') : ''
      return {
        state: c - minutes <= 45 ? 'closing-soon' : 'open',
        headline: `Open now until ${fmt(today.season.close)}`,
        detail: `Admission is free${boat}`,
        rentals: today.season.rentals,
      }
    }
    if (minutes < o) return { state: 'closed', headline: `Opens today at ${fmt(today.season.open)}`, detail: `Open until ${fmt(today.season.close)} · Admission is free`, rentals: today.season.rentals }
  }
  // find next open day
  for (let i = 1; i < 60; i++) {
    const next = addDays(iso, i)
    const info = dayInfo(next)
    if (info.isOpen && info.season) {
      const closure = today.closure ?? dayInfo(addDays(iso, 1)).closure
      const why = closure ? `Closed for ${closure.reason}. ` : ''
      const when = i === 1 ? 'tomorrow' : prettyDay(next)
      return { state: 'closed', headline: `Closed now · Opens ${when}`, detail: `${why}${fmt(info.season.open)}–${fmt(info.season.close)} · Admission is free`, rentals: info.season.rentals }
    }
  }
  return { state: 'closed', headline: 'Closed now', detail: 'See hours for the season', rentals: false }
}

// NOAA-style sunset for Lake Union (47.627 N, 122.337 W), returned as a Seattle-local time string.
export function sunset(d = new Date()) {
  const lat = 47.627, lng = -122.337
  const rad = Math.PI / 180
  const start = Date.UTC(d.getUTCFullYear(), 0, 0)
  const n = Math.floor((d.getTime() - start) / 86400000)
  const g = (2 * Math.PI / 365) * (n - 1)
  const eqt = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g))
  const decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g)
  const ha = Math.acos(Math.cos(90.833 * rad) / (Math.cos(lat * rad) * Math.cos(decl)) - Math.tan(lat * rad) * Math.tan(decl)) / rad
  const utcMin = 720 - 4 * (lng - ha) - eqt
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) + utcMin * 60000)
  return t.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Los_Angeles' }).toLowerCase().replace(' ', '')
}

export function weekSchedule(d = new Date()) {
  const { iso } = seattleNow(d)
  return Array.from({ length: 7 }, (_, i) => {
    const day = addDays(iso, i)
    const info = dayInfo(day)
    return {
      iso: day,
      name: new Date(day + 'T12:00:00Z').toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }),
      date: new Date(day + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }),
      hours: info.isOpen && info.season ? `${fmt(info.season.open)}–${fmt(info.season.close)}` : 'Closed',
      note: info.closure ? info.closure.reason : info.isOpen && info.season && !info.season.rentals ? 'Museum only' : '',
      today: i === 0,
    }
  })
}
