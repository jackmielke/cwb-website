// Live Lake Union conditions from Open-Meteo (free, no key, CORS enabled).
export type Conditions = {
  live: boolean
  tempF: number
  windKn: number
  gustKn: number
  windDir: number
  code: number
  sunset: Date
  sunrise: Date
  fetchedAt: Date
}

const LAT = 47.6275
const LON = -122.337

const fallback = (): Conditions => {
  const now = new Date()
  const ymd = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(now)
  const at = (hm: string) => new Date(`${ymd}T${hm}:00${offsetFor(`${ymd}T${hm}`)}`)
  return { live: false, tempF: 58, windKn: 7, gustKn: 11, windDir: 340, code: 2, sunset: at('18:25'), sunrise: at('07:25'), fetchedAt: now }
}

let cache: Promise<Conditions> | null = null

export function getConditions(): Promise<Conditions> {
  if (cache) return cache
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
    `&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code` +
    `&daily=sunset,sunrise&wind_speed_unit=kn&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles&forecast_days=1`
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 4500)
  cache = fetch(url, { signal: ctrl.signal })
    .then((r) => r.json())
    .then((d) => {
      clearTimeout(t)
      // Open-Meteo returns local wall-clock strings; interpret them as Seattle time.
      const toDate = (s: string) => new Date(s + offsetFor(s))
      return {
        live: true,
        tempF: Math.round(d.current.temperature_2m),
        windKn: Math.round(d.current.wind_speed_10m),
        gustKn: Math.round(d.current.wind_gusts_10m),
        windDir: Math.round(d.current.wind_direction_10m),
        code: d.current.weather_code,
        sunset: toDate(d.daily.sunset[0]),
        sunrise: toDate(d.daily.sunrise[0]),
        fetchedAt: new Date(),
      } as Conditions
    })
    .catch(() => fallback())
  return cache
}

function offsetFor(local: string) {
  // Pacific time: PDT (-07:00) from mid-March to early November, otherwise PST (-08:00).
  const d = new Date(local + 'Z')
  const y = d.getUTCFullYear()
  const marchSecondSunday = nthSunday(y, 2, 2)
  const novFirstSunday = nthSunday(y, 10, 1)
  return d >= marchSecondSunday && d < novFirstSunday ? '-07:00' : '-08:00'
}

function nthSunday(year: number, month: number, n: number) {
  const first = new Date(Date.UTC(year, month, 1))
  const day = first.getUTCDay()
  const date = 1 + ((7 - day) % 7) + (n - 1) * 7
  return new Date(Date.UTC(year, month, date, 10))
}

export const compass = (deg: number) => {
  const pts = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  return pts[Math.round((((deg % 360) + 360) % 360) / 22.5) % 16]
}

export const seattleTime = (d: Date) =>
  d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Los_Angeles' })

export const seattleNow = () => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: 'numeric',
    minute: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour12: false,
  }).formatToParts(new Date())
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0)
  return { hour: get('hour') % 24, minute: get('minute'), month: get('month'), day: get('day') }
}

export const describeSky = (code: number) => {
  if (code === 0) return 'Clear'
  if (code <= 2) return 'Mostly clear'
  if (code === 3) return 'Overcast'
  if (code <= 48) return 'Fog'
  if (code <= 57) return 'Drizzle'
  if (code <= 67) return 'Rain'
  if (code <= 77) return 'Snow'
  if (code <= 82) return 'Showers'
  return 'Storms'
}

export function verdict(c: Conditions) {
  const { month, day } = seattleNow()
  const inSeason = (month > 3 || (month === 3 && day >= 15)) && month <= 10
  if (!inSeason)
    return {
      title: 'The livery is resting.',
      body: 'Boat rentals run mid-March through October. The museum and docks are still free to wander.',
    }
  if (c.code >= 95) return { title: 'Storm watch. Stay ashore.', body: 'The boats will be here tomorrow. The exhibits are dry and free.' }
  if (c.windKn < 4)
    return { title: 'Glassy. A rowing day.', body: 'Barely a breath on the lake. Take a peapod or a canoe and have the water to yourself.' }
  if (c.windKn <= 12)
    return { title: 'A sailing day.', body: 'Steady breeze on Lake Union. Checked-out sailors, the fleet is waiting.' }
  if (c.windKn <= 18)
    return { title: 'Fresh breeze.', body: 'Spirited conditions. Experienced sailors only; everyone else, a rowboat in the lee.' }
  return { title: 'Too much breeze.', body: 'The dockmaster will likely keep the small boats in. Come see them up close instead.' }
}

// Sunrise and sunset for Lake Union on a given day, computed locally (NOAA approximation),
// so the live sky is right even before or without the weather fetch.
export function sunTimes(date = new Date()) {
  const rad = Math.PI / 180
  const dayMs = 86400000
  const J1970 = 2440588
  const J2000 = 2451545
  const toJulian = (d: Date) => d.getTime() / dayMs - 0.5 + J1970
  const fromJulian = (j: number) => new Date((j + 0.5 - J1970) * dayMs)
  const lw = -LON * rad
  const phi = LAT * rad
  const d = toJulian(date) - J2000
  const n = Math.round(d - 0.0009 - lw / (2 * Math.PI))
  const ds = 0.0009 + lw / (2 * Math.PI) + n
  const M = rad * (357.5291 + 0.98560028 * ds)
  const C = rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M))
  const L = M + C + rad * 102.9372 + Math.PI
  const dec = Math.asin(Math.sin(L) * Math.sin(rad * 23.4397))
  const Jnoon = J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L)
  const w = Math.acos((Math.sin(-0.833 * rad) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec)))
  const Jset = J2000 + 0.0009 + (w + lw) / (2 * Math.PI) + n + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L)
  const Jrise = Jnoon - (Jset - Jnoon)
  return { sunrise: fromJulian(Jrise), sunset: fromJulian(Jset) }
}

export type SkyPhase = 'morning' | 'day' | 'golden' | 'dusk' | 'night'

// What the sky over Lake Union is doing right now.
export function skyPhase(now = new Date()): SkyPhase {
  const { sunrise, sunset } = sunTimes(now)
  const m = (a: Date) => (now.getTime() - a.getTime()) / 60000
  const sinceRise = m(sunrise)
  const sinceSet = m(sunset)
  if (sinceRise < -35 || sinceSet > 45) return 'night'
  if (sinceRise < 60) return 'morning'
  if (sinceSet > -5) return 'dusk'
  if (sinceSet > -90) return 'golden'
  return 'day'
}

export const phaseLabel: Record<SkyPhase, string> = {
  morning: 'sunrise',
  day: 'daytime',
  golden: 'golden hour',
  dusk: 'dusk',
  night: 'night',
}
