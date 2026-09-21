export interface Villa {
  id: string
  title: string
  subtitle: string
  sqft: number
  capacity: string
  pricePerNight: number
  featuredImage: string
  highlights: string[]
  description: string
}

export interface DiningExperience {
  id: string
  name: string
  category: string
  hours: string
  description: string
  chefNote: string
}

export interface ResortExperience {
  id: string
  title: string
  duration: string
  elevation: string
  description: string
  tag: string
}

export const PAVILION_VILLAS: Villa[] = [
  {
    id: 'pine-ridge-estate',
    title: 'Pine Ridge Cantilever Estate',
    subtitle: 'Panoramic mountain precipice sanctuary',
    sqft: 2850,
    capacity: 'Up to 4 Guests',
    pricePerNight: 1250,
    featuredImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Private cedar thermal tub', 'Suspended cliff deck', 'Dedicated tea sommelier', 'Open hearth firepit'],
    description: 'Suspended above ancient pine ridges, featuring glass curtain walls that frame morning sea clouds and nocturnal constellation skies.'
  },
  {
    id: 'glasshouse-pavilion',
    title: 'The Solarium Glass Villa',
    subtitle: '360° architectural glass pavilion',
    sqft: 2200,
    capacity: '2 Guests (Adults Only)',
    pricePerNight: 980,
    featuredImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Retractable glass roof', 'Heated stone floors', 'In-suite forest sauna', 'Valley infinity edge pool'],
    description: 'A masterpiece of modernist timber and glass, inviting the quiet whispering canopy into your living quarters while ensuring seamless seclusion.'
  },
  {
    id: 'misty-valley-chalet',
    title: 'Misty Ridge Sanctuary',
    subtitle: 'Multi-tiered alpine timber haven',
    sqft: 3400,
    capacity: 'Up to 6 Guests',
    pricePerNight: 1650,
    featuredImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Wine cellar tasting alcove', 'Double-sided basalt fireplace', 'Private chef pantry', 'Mountain spring plunge'],
    description: 'Hand-hewn cedar beams meet polished local slate. Designed for families and private gatherings desiring expansive quietude.'
  }
]

export const DINING_EXPERIENCES: DiningExperience[] = [
  {
    id: 'pavilion-terrace',
    name: 'The Altitude Pavilion',
    category: 'Fine Dining & Wild Foraged Gastronomy',
    hours: '18:00 — 22:30 Daily',
    description: 'Hyper-seasonal tasting menus crafted with ingredients foraged from our 400-acre hillside reserve and partnered highland organic farms.',
    chefNote: 'Seven-course tasting experience paired with rare cellar vintages.'
  },
  {
    id: 'cedar-hearth',
    name: 'The Cedar Hearth & Bar',
    category: 'Artisan Woodfire & Botanical Mixology',
    hours: '12:00 — 23:00 Daily',
    description: 'Charcoal-grilled mountain trout, slow-roasted heirloom roots, and botanical elixirs infused with wild juniper and pine needle syrup.',
    chefNote: 'Casual warmth centered around our 4-meter open volcanic stone hearth.'
  }
]

export const RESORT_EXPERIENCES: ResortExperience[] = [
  {
    id: 'stargazing',
    title: 'High-Altitude Observatory Session',
    duration: '2 Hours',
    elevation: '2,400m',
    tag: 'Celestial',
    description: 'Equipped with research-grade apochromatic refractors under certified dark-sky mountain air.'
  },
  {
    id: 'forest-spa',
    title: 'Subalpine Mineral Thermal Baths',
    duration: 'Half Day',
    elevation: '2,200m',
    tag: 'Wellness',
    description: 'Spring waters drawn from geothermal fissures, naturally rich in sulphur, silica, and magnesium.'
  },
  {
    id: 'tea-ritual',
    title: 'Highland Moss & Tea Ceremony',
    duration: '90 Mins',
    elevation: '2,350m',
    tag: 'Culture',
    description: 'Single-estate wild tea tastings guided by our resident tea master inside the secluded moss garden pagoda.'
  }
]
