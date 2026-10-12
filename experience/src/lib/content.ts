// All copy and figures in one place so it can move into a CMS later.
// Sources: cwb.org, CWB 2022 annual report, IRS Form 990 (FY2024), 2026 rental rate sheet.

export const LIVE = {
  inquiry: 'https://ravishingradish.com/cwbinquiry',
  cwb: 'https://www.cwb.org',
  donate: 'https://www.cwb.org/give',
  membership: 'https://www.cwb.org/membership',
  rent: 'https://www.cwb.org/rent',
  freePrograms: 'https://www.cwb.org/free-programs',
  publicSail: 'https://www.cwb.org/public-sail',
  youth: 'https://www.cwb.org/youth-programs-camps',
  adultSailing: 'https://www.cwb.org/adult-sailing',
  boatbuilding: 'https://www.cwb.org/chesapeake-light-craft-boatbuilding-classes',
  volunteer: 'https://www.cwb.org/volunteer',
  exhibits: 'https://www.cwb.org/current-exhibits',
  history: 'https://www.cwb.org/history',
  hours: 'https://www.cwb.org/hourslocations',
  calendar: 'https://www.cwb.org/calendar',
  boatsForSale: 'https://www.cwb.org/boats-for-sale-1',
  charters: 'https://www.cwb.org/charters',
  facility: 'https://www.cwb.org/facility-rentals',
  enews: 'https://www.cwb.org/enews',
  landmark: 'https://www.cwb.org/cwb-landmarking',
  film: 'https://www.bbc.com/storyworks/in-pursuit-of-wellness/shape-of-water',
  filmTrailer: 'https://www.youtube.com/watch?v=UkOdHtuz7_Q',
  fourCulture: 'https://www.4culture.org/',
  instagram: 'https://www.instagram.com/centerforwoodenboats/',
  facebook: 'https://www.facebook.com/centerforwoodenboats/',
  youtube: 'https://www.youtube.com/user/centerforwoodenboats',
  phone: 'tel:+12063822628',
}

export const HOURS = {
  days: 'Wednesday to Sunday',
  open: '11:30 AM to 7:00 PM',
  lastBoat: '5:30 PM',
  phone: '(206) 382-2628',
}

const C = (path: string) => `https://www.cwb.org/${path}`

// Current bulletin from the cwb.org homepage. Date-bound items need a refresh before launch.
export type Notice = { flag: string; desk: string; title: string; body: string; when: string; href: string }
export const NOTICES: Notice[] = [
  { flag: 'P', desk: 'Museum', title: 'PRIMA Jubilee: A Nautical Celebration', body: 'Seventeen marine artists from the West Coast and Hawaii, hung among the boats.', when: 'Through November 8', href: C('prima-jubilee') },
  { flag: 'Y', desk: 'Youth', title: 'Fall youth sailing is open', body: 'School-year sailing registrations are live, and Learn to Race is under way.', when: 'Registering now', href: C('youth-school-year-sailing') },
  { flag: 'N', desk: 'New classes', title: 'Sailing Skills Clinic', body: 'A new class for sailors who have their checkout and want more confidence at the helm.', when: 'New this season', href: C('sailing-skills-clinic') },
  { flag: 'S', desk: 'New classes', title: 'Safe Powerboat Handling', body: 'A new class for anyone who drives a motor boat, from the basics to close-quarters handling.', when: 'New this season', href: C('safe-powerboat-handling') },
  { flag: 'R', desk: 'On the water', title: 'W.O.O.D. Regatta results', body: 'Results and photos from the Norm Blanchard W.O.O.D. Regatta.', when: 'Just in', href: C('wood-regatta') },
  { flag: 'G', desk: 'Gifts', title: 'Season passes are back', body: 'A summer of sailing in an envelope. The easiest gift on the lake.', when: 'Available now', href: C('boat-rentals') },
  { flag: 'B', desk: 'Workshop', title: 'CLC boatbuilding, 2027', body: 'Build your own kayak or skiff in the shop. Next year\'s classes post in February.', when: 'February 2027', href: C('chesapeake-light-craft-boatbuilding-classes') },
  { flag: 'H', desk: 'Members', title: 'Happy Hour 4 Good', body: 'Member evenings on the docks. Check the calendar for the next one.', when: 'Monthly', href: C('hh4g') },
]

// The full cwb.org site, so nothing on the current site is unreachable from the prototype.
export const SITEMAP: { title: string; links: [string, string][] }[] = [
  { title: 'Visit', links: [['Get on the water', C('onthewater')], ['Hours & location', C('hourslocations')], ['FAQ', C('faq')], ['Calendar', C('calendar')], ['Find parking', C('find-parking')]] },
  { title: 'About', links: [['Mission, vision & values', C('mission')], ['2025 Strategic Plan', C('strat-plan')], ['Board of Trustees', C('board-of-trustees')], ['Landmarked campus', C('cwb-landmarking')], ['History', C('history')], ['Staff', C('staff')], ['Join our crew', C('careers')], ['Contact', C('contact')]] },
  { title: 'Programs', links: [['Free programs', C('free-programs')], ['Adult sailing', C('adult-sailing')], ['CLC boatbuilding', C('chesapeake-light-craft-boatbuilding-classes')], ['Maritime first aid', C('maritime-first-aid')], ['Youth programs & camps', C('youth-programs-camps')], ['Young Mariners Initiative', C('ymi')], ['Boatwright Apprentice', C('boatwright-apprentice')]] },
  { title: 'Boats', links: [['Rent a boat', C('boat-rentals')], ['Charter cruises', C('charters')], ['Pond boat rentals', C('pond-boat-rentals')], ['Boats for sale', C('boats-for-sale-1')]] },
  { title: 'Exhibits', links: [['Current exhibits', C('current-exhibits')], ['PRIMA Jubilee', C('prima-jubilee')], ['Past exhibits', C('past-exhibits')], ['Kitten boatbuilding', C('kitten')], ['Blanchard restoration', C('bjk-restoration-project')], ['Preservation & documentation', C('preservation')]] },
  { title: 'Events', links: [['Sunday Public Sail', C('public-sail')], ['W.O.O.D. Regatta', C('wood-regatta')], ['Facility rentals', C('facility-rentals')], ['Monthly newsletter', C('enews')], ['Community stories', C('our-community')], ['50th reunion photos', C('50th-anniversary-reunion-photo-gallery')]] },
  { title: 'Support & join', links: [['Ways to give', C('give')], ['Membership', C('membership')], ['Sponsorships', C('sponsor')], ['Volunteer', C('volunteer')], ['Junior Instructors', C('junior-instructor')]] },
]

export type BoatKind = 'knockabout' | 'peapod' | 'catboat' | 'eltoro' | 'canoe' | 'skiff' | 'launch'

export type Boat = {
  name: string
  kind: BoatKind
  type: string
  note: string
  spec: [string, string][]
  rate: string
  cta: string
  href: string
}

export const FLEET: Boat[] = [
  {
    name: 'The Knockabouts',
    kind: 'knockabout',
    type: 'Blanchard Junior Knockabout · 20 ft',
    note: 'Eight of them, designed and built right here on Lake Union by Norman Blanchard. The backbone of the fleet.',
    spec: [
      ['Built', 'Lake Union'],
      ['Crew', '2 to 4'],
      ['Needs', 'Sailing checkout'],
    ],
    rate: '$80 member · $100 / hr',
    cta: 'Reserve a sail',
    href: LIVE.rent,
  },
  {
    name: 'The Peapods',
    kind: 'peapod',
    type: 'Double-ended rowboat',
    note: 'Pointed at both ends so they track straight and forgive beginners. Row one free for an hour, once a week, walk-up.',
    spec: [
      ['Crew', '1 to 3'],
      ['Needs', 'Nothing. Just show up'],
      ['Cost', 'Free'],
    ],
    rate: 'Free · weekly walk-up',
    cta: 'How free rows work',
    href: LIVE.freePrograms,
  },
  {
    name: 'Riff',
    kind: 'catboat',
    type: 'Catboat',
    note: 'One mast, one big sail, set right up in the bow. Beamy, steady and easy to love. Ask the dock about her story.',
    spec: [
      ['Rig', 'Single sail'],
      ['Feel', 'Steady'],
      ['Needs', 'Sailing checkout'],
    ],
    rate: 'Small sailboat rate · from $45 / hr',
    cta: 'Reserve a sail',
    href: LIVE.rent,
  },
  {
    name: 'Mario & Luigi',
    kind: 'eltoro',
    type: 'El Toro dinghies · 8 ft',
    note: 'Two tiny prams where a lot of Seattle kids took their first tiller. Small boat, big feelings.',
    spec: [
      ['Crew', '1'],
      ['Used for', 'Youth sailing'],
      ['Count', 'A matched pair'],
    ],
    rate: 'Youth programs and camps',
    cta: 'Youth sailing',
    href: LIVE.youth,
  },
  {
    name: 'Canoes & kayaks',
    kind: 'canoe',
    type: 'Paddle craft',
    note: 'The quietest way to see the houseboats, the seaplanes and the skyline from water level.',
    spec: [
      ['Crew', '1 to 3'],
      ['Needs', 'A paddle and a PFD'],
      ['Season', 'Mid-March to October'],
    ],
    rate: '$25 member · $35 / hr',
    cta: 'Rent a paddle craft',
    href: LIVE.rent,
  },
  {
    name: 'Larry',
    kind: 'skiff',
    type: 'Safety boat',
    note: 'Not for rent, but always out there. If you capsize a Knockabout, Larry is the first friendly face you see.',
    spec: [
      ['Role', 'Safety'],
      ['Crew', 'Dock staff'],
      ['Status', 'On watch'],
    ],
    rate: 'Not for hire. Thankfully.',
    cta: 'Learn to sail',
    href: LIVE.adultSailing,
  },
  {
    name: 'Dora',
    kind: 'launch',
    type: 'Motorized wooden vessel',
    note: 'Bring your people aboard for a private charter on the lake, with a CWB skipper at the helm.',
    spec: [
      ['Use', 'Private charters'],
      ['Skipper', 'Included'],
      ['Book', 'In advance'],
    ],
    rate: 'Private charter',
    cta: 'Charter Dora',
    href: LIVE.charters,
  },
]

export const MILESTONES = [
  { year: '1957', title: 'A stranger, a mast, the Fremont Bridge.', body: 'Dick Wagner helps someone step a mast below the bridge. A lifelong habit of helping people onto the water begins.' },
  { year: '1968', title: 'A livery under the Aurora Bridge.', body: 'Dick and Colleen Wagner start renting wooden boats from their houseboat.' },
  { year: '1976', title: 'A living museum is founded.', body: 'The Wagners and their patrons found The Center for Wooden Boats: a museum whose collection you are meant to use.' },
  { year: '1983', title: 'Home on Waterway 4.', body: 'After a long shoreline permit fight, the campus opens on a former industrial waterway at the south end of the lake.' },
  { year: '1989', title: 'The Boathouse is dedicated.', body: 'A floating building joins the boat shop, pavilion and oar house. Today the floating campus is a designated Seattle Landmark.' },
  { year: '2008', title: 'Classrooms that float.', body: 'Floating classrooms and a carving shed give the craft room to grow.' },
  { year: '2019', title: 'The Wagner Education Center.', body: 'A $6.5M building by Tom Kundig opens on Lake Union Park, with boats hung overhead and doors that slide open to the water.' },
  { year: '2024', title: 'Bigger than ever, still free.', body: 'Over $2.2M in revenue, 57% of it from people who simply believe in the place. Admission stays free.' },
  { year: '2026', title: 'The fiftieth season.', body: 'Fifty years in, the reunion draws 350 people and the fleet is still out on the water every open day.' },
]

export const STATS = [
  { value: 119557, label: 'visitors to the South Lake Union campus in one year' },
  { value: 8304, label: 'people who took out a boat' },
  { value: 39, suffix: '%', label: 'of them sailed or rowed for free' },
  { value: 3318, label: 'kids who built a toy boat' },
  { value: 17134, label: 'volunteer hours, logged plank by plank' },
]

export const SPACES = [
  {
    id: 'boathouse',
    name: 'Floating Boat House',
    tag: 'On the water',
    img: 'img/boathouse-lanterns.webp',
    img2: 'img/boathouse-deck.webp',
    body: 'A 1989 floating building with a wraparound deck, lantern light and boats tied up alongside. The one people remember.',
    facts: [
      ['Base rate', 'from $2,300, 5 hours'],
      ['Weekends', '$2,800 to $3,400'],
      ['Includes', 'Deck and setup time'],
    ],
  },
  {
    id: 'loft',
    name: 'Wagner Education Sail Loft',
    tag: 'Kundig-designed',
    img: 'img/sail-loft.webp',
    img2: 'img/wagner-night.webp',
    body: 'Warm timber, tall glass and a view down Lake Union. Dinners, receptions, offsites and lectures.',
    facts: [
      ['Base rate', 'from $2,300, 5 hours'],
      ['Weekends', '$2,800 to $3,400'],
      ['Extra hours', '$325 to $375 / hr'],
    ],
  },
  {
    id: 'hall',
    name: 'Bill Garden Boat Hall',
    tag: 'Among the collection',
    img: 'img/wagner-boats.webp',
    img2: 'img/gallery-hall.webp',
    body: 'Celebrate under hulls hung from the rafters. Offered in seasonal windows, like the holidays.',
    facts: [
      ['Availability', 'Seasonal windows'],
      ['Rate', 'On request'],
      ['Good for', 'Galas, holidays'],
    ],
  },
  {
    id: 'buyout',
    name: 'Full building buyout',
    tag: 'The whole waterfront',
    img: 'img/wagner-night.webp',
    img2: 'img/wedding-dock.webp',
    body: 'Every space, the docks and the boats as your backdrop. For the wedding, the launch or the fiftieth birthday.',
    facts: [
      ['Est. capacity', '200 seated, 300 reception'],
      ['Rate', 'On request'],
      ['Catering', 'Ravishing Radish'],
    ],
  },
]

export const TIERS = [
  { name: 'Student & senior', price: 35, flag: 'S', perk: 'Member rental rates and the season pass option.' },
  { name: 'Individual', price: 75, flag: 'I', perk: 'Member rates on every boat, all season.' },
  { name: 'Dual', price: 120, flag: 'D', perk: 'Two people, one membership, a lot of afternoons.' },
  { name: 'Family', price: 180, flag: 'F', perk: 'The whole crew sails at member rates.' },
  { name: 'Fleet Keeper', price: 300, flag: 'K', perk: 'Keeps a wooden boat in the water for everyone else.' },
]
