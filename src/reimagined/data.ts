// Content for the reimagined site, drawn from cwb.org (Oct 2026) and CWB's published reports.

type Glyph = 'sloop' | 'cat' | 'row' | 'canoe' | 'launch'
export const fleet: { name: string; type: string; glyph: Glyph; story: string; specs: [string, string][] }[] = [
  { name: 'Blanchard Junior Knockabout', type: 'Large sailboat', glyph: 'sloop', story: 'A 20-foot sloop designed and built right here on Lake Union by Norm Blanchard. Eight of them anchor our fleet, and they still sail like the day they launched.', specs: [['Crew', '1–6'], ['Per hour', '$80 / $100'], ['Rig', 'Sloop'], ['Built', 'Lake Union']] },
  { name: 'Lightning', type: 'Large sailboat', glyph: 'sloop', story: 'A classic 19-foot one-design from 1938. Quick, responsive, and the boat people come back for once they have their checkout.', specs: [['Crew', '1–6'], ['Per hour', '$80 / $100'], ['Rig', 'Sloop'], ['Checkout', 'Required']] },
  { name: 'Riff', type: 'Small sailboat', glyph: 'cat', story: 'One of our cat boats: one mast, one sail, and a forgiving nature. A favorite for a first solo afternoon on the lake.', specs: [['Crew', '1–4'], ['Per hour', '$45 / $50'], ['Rig', 'Cat'], ['Checkout', 'Required']] },
  { name: 'Pelican', type: 'Small sailboat', glyph: 'cat', story: 'A stubby, stable San Francisco Bay design with a high bow and a lot of heart. Gaff, sprit, sloop and lug rigs fill out the small-boat fleet.', specs: [['Crew', '1–4'], ['Per hour', '$45 / $50'], ['Rig', 'Various'], ['Checkout', 'Required']] },
  { name: 'Peapod', type: 'Rowboat', glyph: 'row', story: 'Double-ended rowboats with Maine roots. Walk up to the floating boatshop and row one free for an hour, once a week.', specs: [['Crew', 'Up to 4'], ['Per hour', 'Free · $30 / $40'], ['Power', 'Oars'], ['Checkout', 'None']] },
  { name: 'Whitehall', type: 'Rowboat', glyph: 'row', story: 'Born as a 19th-century harbor water taxi. Long, slender and fast: the rowboat that makes you feel like you know what you are doing.', specs: [['Crew', 'Up to 4'], ['Per hour', '$30 / $40'], ['Power', 'Oars'], ['Checkout', 'None']] },
  { name: 'Canoes & kayaks', type: 'Paddle craft', glyph: 'canoe', story: 'Singles and doubles for a slow loop past the houseboats and Gas Works Park. Life jackets for every age, babies included.', specs: [['Crew', '1–2'], ['Per hour', '$25 / $35'], ['Power', 'Paddles'], ['Checkout', 'None']] },
  { name: 'Boat House No. 5', type: 'Charter launch', glyph: 'launch', story: 'A Bill Garden design built as a salmon-fishing launch, now fully restored. A licensed captain takes up to six of you around the lake for 90 minutes.', specs: [['Guests', 'Up to 6'], ['Charter', '$280 / $350'], ['Season', 'Apr–Sep'], ['Captain', 'Included']] },
]

export const rates = [
  { cls: 'Large sailboats', who: '1–6 people · sloop-rigged', member: 80, general: 100, note: 'Blanchard Junior Knockabouts, Lightnings', checkout: true },
  { cls: 'Small sailboats', who: '1–4 people · gaff, sprit, sloop and lug', member: 45, general: 50, note: 'Cat boats, Pelicans, Hvalsoe and Sid skiffs', checkout: true },
  { cls: 'Rowboats', who: 'Up to 4 adults', member: 30, general: 40, note: 'Peapods, Whitehalls, Hvalsoe 15s', checkout: false },
  { cls: 'Canoes', who: '1–2 people', member: 25, general: 35, note: '', checkout: false },
  { cls: 'Kayaks', who: 'Singles and doubles', member: 25, general: 35, note: '', checkout: false },
]

export const passes = [
  { name: 'Small Boat Pass', price: 350, body: 'A year of CWB sailboats with three or fewer aboard.' },
  { name: 'Weekday Pass', price: 550, body: 'Unlimited weekday sail and human-powered boats for 365 days.' },
  { name: 'Die Hard Pass', price: 800, body: 'Unlimited sail and human-powered boats whenever the livery is open, all year.' },
]

export const freeDays2026 = ['Apr 12', 'May 10', 'Jun 14', 'Jul 26', 'Aug 30', 'Sep 27']

export const memberships = [
  { name: 'Apprentice', kind: 'Student, 18+', price: 35, perks: ['Up to 25% off boat rentals', 'Up to 20% off classes', 'Monthly eNewsletter'] },
  { name: 'Master Craftsman', kind: 'Senior, 62+', price: 35, perks: ['Up to 25% off boat rentals', 'Up to 20% off classes', 'Monthly eNewsletter'] },
  { name: 'Boatwright', kind: 'Individual', price: 75, perks: ['Up to 25% off boat rentals', 'Access to Livery Season Passes', 'Member-only events and classes'] },
  { name: 'Dock Wranglers', kind: 'Dual', price: 120, perks: ['Everything in Boatwright, for two adults', '20% off the gift shop', 'Local business discounts'] },
  { name: 'Boathouse', kind: 'Family', price: 180, featured: true, perks: ['Two adults and up to four kids', 'Up to 20% off youth camps', 'Free entry at reciprocal maritime museums'] },
  { name: 'Fleet Keeper', kind: 'Contributing', price: 300, perks: ['Everything in Boathouse', 'A complimentary sail checkout', '10% off facility rentals, plus a CWB hat or tee'] },
]
