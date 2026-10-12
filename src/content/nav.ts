// Navigation exactly as it appears on cwb.org (captured October 2026).
export type NavLink = { label: string; slug: string }
export type NavGroup = { label: string; slug?: string; items: NavLink[] }

export const originalNav: NavGroup[] = [
  { label: 'Visit', items: [
    { label: 'Get On the Water', slug: 'onthewater' },
    { label: 'Hours & Location', slug: 'hourslocations' },
    { label: 'FAQ', slug: 'faq' },
    { label: 'Calendar', slug: 'calendar' },
    { label: 'Find Parking', slug: 'find-parking' },
  ] },
  { label: 'About', items: [
    { label: 'Mission, Vision, & Values', slug: 'mission' },
    { label: '2025 Strategic Plan', slug: 'strat-plan' },
    { label: 'Board of Trustees', slug: 'board-of-trustees' },
    { label: 'Landmarked Campus', slug: 'cwb-landmarking' },
    { label: 'History', slug: 'history' },
    { label: 'Contact', slug: 'contact' },
    { label: 'Staff', slug: 'staff' },
    { label: 'Join Our Crew', slug: 'careers' },
  ] },
  { label: 'Programs', items: [
    { label: 'Free Programs', slug: 'free-programs' },
    { label: 'Adult Sailing Programs', slug: 'adult-sailing' },
    { label: 'Chesapeake Light Craft Boatbuilding', slug: 'chesapeake-light-craft-boatbuilding-classes' },
    { label: 'Maritime First Aid Classes', slug: 'maritime-first-aid' },
    { label: 'Youth Programs & Camps', slug: 'youth-programs-camps' },
    { label: 'Young Mariners Initiative', slug: 'ymi' },
    { label: 'Boatwright Apprentice Program', slug: 'boatwright-apprentice' },
  ] },
  { label: 'Boat Rentals', items: [
    { label: 'Rent a Boat', slug: 'rent' },
    { label: 'Charter Cruises', slug: 'charters' },
    { label: 'Pond Boat Rentals', slug: 'pond-boat-rentals' },
  ] },
  { label: 'Volunteer', items: [
    { label: 'Volunteer', slug: 'volunteer' },
    { label: 'Junior Instructors', slug: 'junior-instructor' },
  ] },
  { label: 'Exhibits', items: [
    { label: 'Current Exhibits', slug: 'current-exhibits' },
    { label: 'PRIMA Jubilee Exhibition', slug: 'prima-jubilee' },
    { label: 'Past Exhibits', slug: 'past-exhibits' },
    { label: 'Kitten Boatbuilding Project', slug: 'kitten' },
    { label: 'Blanchard Restoration', slug: 'bjk-restoration-project' },
    { label: 'Preservation & Documentation', slug: 'preservation' },
  ] },
  { label: 'Events', items: [
    { label: 'Sunday Public Sail', slug: 'public-sail' },
    { label: 'Norm Blanchard W.O.O.D. Regatta', slug: 'wood-regatta' },
    { label: 'Facility Rentals', slug: 'facility-rentals' },
    { label: 'Calendar', slug: 'calendar-2' },
  ] },
  { label: 'Our Community', items: [
    { label: 'Monthly Newsletter', slug: 'enews' },
    { label: 'Community Stories', slug: 'blog' },
    { label: '50th Anniversary Reunion Photo Gallery', slug: '50th-anniversary-reunion-photo-gallery' },
  ] },
  { label: 'Boats for Sale', slug: 'boats-for-sale-1', items: [] },
  { label: 'Support and Join', items: [
    { label: 'Ways to Give', slug: 'give' },
    { label: 'Membership', slug: 'membership' },
    { label: 'Sponsorships', slug: 'sponsor' },
  ] },
]

export const allOriginalSlugs = originalNav.flatMap((g) => (g.slug ? [g.slug] : g.items.map((i) => i.slug)))
