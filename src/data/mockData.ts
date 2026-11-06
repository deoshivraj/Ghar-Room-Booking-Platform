import { Amenity, ExploreSpot, Room, Booking } from '../types';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'dorm-6',
    type: 'dorm',
    name: 'Dorms',
    tagline: 'Social, comfortable beds, each with a personal locker.',
    pricePerNight: 699,
    capacityText: '1 Bunk Bed in 6-Bed or 8-Bed Shared Dorm',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    description: 'Designed for backpackers, solo travelers, and digital nomads seeking community and rest. Sturdy solid pine wood bunk beds, individual privacy curtains, reading lamps, universal power sockets, and individual large metal lockers for your backpack.',
    features: [
      'Personal steel locker with padlock loop',
      'Ultra-comfortable 6-inch orthopedic mattress',
      'Individual night light & dual universal plug point',
      'High-speed 100 Mbps fiber Wi-Fi throughout',
      'Fresh crisp cotton bedsheets & warm Himalayan duvets',
      'Shared washrooms with 24/7 solar hot water'
    ],
    specs: {
      beds: 'Custom pine wood bunk bed',
      bathroom: 'Shared modern washroom (hot shower)',
      view: 'Forest & mountain courtyard view',
      lockers: 'Full-size locker included (bring your padlock or rent one)',
      wifi: 'High-speed fiber (100+ Mbps)'
    }
  },
  {
    id: 'private-mountain',
    type: 'private',
    name: 'Private rooms',
    tagline: 'Wake up to the mountains from your own room.',
    pricePerNight: 1899,
    capacityText: 'King Bed · Private Ensuite Bathroom · Mountain View Balcony',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    description: 'An alpine sanctuary overlooking the majestic pine slopes and snow-capped peaks of the Dhauladhar range. Warm wood paneling, private balcony to sip morning Kangra chai, attached western washroom with hot geyser, and a quiet work desk with mountain views.',
    features: [
      'Private balcony with direct Dhauladhar mountain views',
      'Attached modern bathroom with 24/7 instant hot geyser',
      'Dedicated pine work desk with ergonomic chair',
      'King-sized spring mattress with thermal quilt',
      'Electric kettle with artisan Himalayan green & black teas',
      'Cozy room heating available on request'
    ],
    specs: {
      beds: '1 King Size Bed (Sleeps 2)',
      bathroom: 'Private ensuite bathroom with shower & toiletries',
      view: 'Direct snow peaks & valley panoramic balcony',
      lockers: 'Wardrobe with lockable drawers',
      wifi: 'High-speed dedicated Wi-Fi'
    }
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'coworking',
    title: 'Co-working',
    subtitle: 'High-speed fiber & quiet zones',
    description: 'Dedicated workstations, ergonomic seating, multiple power outlets, and uninterrupted fiber internet for remote workers and nomads.'
  },
  {
    id: 'parking',
    title: 'Parking facility',
    subtitle: 'Safe on-site & street parking',
    description: 'Designated parking spots for two-wheelers and nearby safe parking for four-wheelers arriving via the Dharamkot motorable road.'
  },
  {
    id: 'dorm-locker',
    title: 'Dorms with locker',
    subtitle: 'Secure storage for luggage',
    description: 'Individual deep metal lockers for every single dorm bed to keep your laptops, camera gear, and trekking backpacks safe.'
  },
  {
    id: 'private-room',
    title: 'Private room, mountain view',
    subtitle: 'Balconies facing Dhauladhar',
    description: 'Spacious private rooms featuring attached bathrooms, cozy duvets, and balconies opening right onto the pine forests.'
  },
  {
    id: 'cafe',
    title: 'Cafe with scenic view',
    subtitle: 'Fresh brews & organic bites',
    description: 'In-house rooftop and garden cafe serving freshly brewed espresso, authentic Himachali chai, wood-fired pizzas, and healthy bowls.'
  },
  {
    id: 'hangout',
    title: 'Common hangout area',
    subtitle: 'Music, bonfire & community',
    description: 'A cozy living room and outdoor terrace with acoustic guitars, evening bonfires under starry skies, and great conversations.'
  },
  {
    id: 'wifi',
    title: 'Free Wi-Fi',
    subtitle: '100+ Mbps seamless connection',
    description: 'Enterprise-grade fiber Wi-Fi covering dorms, private rooms, cafe, and garden terrace for lag-free video calls and uploads.'
  },
  {
    id: 'indoor-games',
    title: 'Indoor games',
    subtitle: 'Carrom, chess & cards',
    description: 'Relax after a strenuous trek with carrom, board games, chess, Uno, and a curated library of travel and philosophy books.'
  },
  {
    id: 'laundry',
    title: 'Laundry (chargeable)',
    subtitle: 'Quick wash & dry service',
    description: 'Affordable, prompt laundry and sun-drying service so your trekking gear and clothes are fresh for your next adventure.'
  },
  {
    id: 'two-wheelers',
    title: 'Two-wheelers on rent',
    subtitle: 'Scooters & mountain bikes',
    description: 'Rent Activa scooters and bikes directly from the hostel reception to effortlessly explore McLeod Ganj, Nadi, and Dharamshala.'
  },
  {
    id: 'camping',
    title: 'Camping package',
    subtitle: 'Tents & gear for Triund',
    description: 'High-altitude tents, sleeping bags, trekking poles, and experienced local mountain guides for overnight camping at Triund ridge.'
  }
];

export const EXPLORE_SPOTS: ExploreSpot[] = [
  {
    id: 'triund',
    title: 'Triund Top',
    subtitle: 'The crown jewel of Dhauladhar',
    distance: '9 km trek from Ghar',
    travelTime: '3.5 - 4.5 hours hike',
    type: 'Trek',
    difficulty: 'Moderate',
    description: 'A world-famous trekking ridge at 2,850m with breathtaking 360-degree views of the Dhauladhar snowline on one side and the vast Kangra valley on the other.',
    hostTip: 'Start early morning by 7:30 AM from Ghar to catch the clear morning ridge and beat the afternoon mist.',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
    polaroidRotation: '-rotate-2'
  },
  {
    id: 'gallu',
    title: 'Gallu Water Fall',
    subtitle: 'Hidden emerald mountain cascade',
    distance: '2.2 km from Ghar',
    travelTime: '35 mins walk',
    type: 'Waterfall',
    difficulty: 'Easy',
    description: 'A serene, lesser-crowded waterfall hidden in the pine forest beyond Gallu Devi Temple, featuring cool natural plunge pools and riverside cafes.',
    hostTip: 'Wear slip-resistant trail shoes as the path along the water channel can be rocky and damp.',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
    polaroidRotation: 'rotate-1'
  },
  {
    id: 'dharamkot',
    title: 'Dharamkot',
    subtitle: 'The Bohemian village in the clouds',
    distance: '0 km (Right outside our doorstep)',
    travelTime: 'Immediate access',
    type: 'Town / Cafe',
    difficulty: 'Easy',
    description: 'Known as the Yoga and meditation hub of Himachal, Dharamkot features vibrant international cafes, live sitar sessions, woodfired bakeries, and laid-back mountain vibes.',
    hostTip: 'Try the Bhagsu cake, hummus falafel, and herbal teas at the local hidden village bakeries.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    polaroidRotation: 'rotate-2'
  },
  {
    id: 'nadi',
    title: 'Nadi View Point',
    subtitle: 'Legendary sunset panoramic spot',
    distance: '4.5 km from Ghar',
    travelTime: '15 mins drive / 1 hr walk',
    type: 'Viewpoint',
    difficulty: 'Easy',
    description: 'Famous for unobstructed golden-hour sunsets over the Himalayan peaks and the pine-dotted valley. A lovely scenic walk or quick scooter ride.',
    hostTip: 'Head out around 4:45 PM with a warm fleece to watch the sky turn brilliant orange and pink.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    polaroidRotation: '-rotate-1'
  },
  {
    id: 'bhagsunag',
    title: 'Bhagsunag Waterfall',
    subtitle: 'Cascading falls & Shiva temple',
    distance: '3.0 km from Ghar',
    travelTime: '40 mins walk / 12 mins ride',
    type: 'Waterfall',
    difficulty: 'Easy',
    description: 'A dramatic 20-meter freshwater waterfall situated next to the historic Bhagsunath Temple, lined with stone steps and legendary mountain cafes like Shiva Cafe.',
    hostTip: 'Climb 10 minutes past the main waterfall pool to reach Shiva Cafe for a relaxed vibe away from crowds.',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    polaroidRotation: 'rotate-1'
  },
  {
    id: 'mcleodganj',
    title: 'Mcleodganj Mall Road',
    subtitle: 'Heart of Tibetan culture & street food',
    distance: '2.5 km from Ghar',
    travelTime: '25 mins downhill walk / 10 mins cab',
    type: 'Town / Cafe',
    difficulty: 'Easy',
    description: 'Bustling bazaar filled with Tibetan handicrafts, singing bowls, prayer flags, steamed momos, thukpa, and vibrant evening street energy.',
    hostTip: 'Walk downhill through the forested shortcut trail to reach Mall Road without getting stuck in vehicle traffic.',
    image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
    polaroidRotation: '-rotate-2'
  },
  {
    id: 'tsuglagkhang',
    title: 'Tsuglagkhang Complex',
    subtitle: 'His Holiness Dalai Lama Temple',
    distance: '3.2 km from Ghar',
    travelTime: '12 mins drive / 35 mins walk',
    type: 'Culture',
    difficulty: 'Easy',
    description: 'The spiritual heart of McLeod Ganj, housing the Dalai Lama’s temple, the Tibet Museum, serene prayer wheel walkways (Kora), and debating monks.',
    hostTip: 'Take the scenic Kora path circumambulating the complex for a meditative walk through prayer flags.',
    image: '/assets/aistudio/tsuglagkhang_complex.jpg',
    polaroidRotation: 'rotate-2'
  },
  {
    id: 'hpca',
    title: 'HPCA Stadium',
    subtitle: 'World’s most scenic cricket ground',
    distance: '11.0 km from Ghar',
    travelTime: '30 mins drive down to Dharamshala',
    type: 'Sports',
    difficulty: 'Easy',
    description: 'Perched at 1,457m with the majestic snow-laden Dhauladhar mountains rising directly behind the pavilion, making it an architectural and sporting marvel.',
    hostTip: 'Open for visitors on non-match days; perfect to combine with a lunch trip down to lower Dharamshala.',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    polaroidRotation: '-rotate-1'
  },
  {
    id: 'teagarden',
    title: 'Tea Garden Dharamsala',
    subtitle: 'Rolling emerald Kangra tea slopes',
    distance: '8.5 km from Ghar',
    travelTime: '22 mins drive',
    type: 'Nature',
    difficulty: 'Easy',
    description: 'Vast slopes of aromatic Kangra green and black tea bushes nestled against mountain views. Visit for peaceful photo walks and local tea tasting.',
    hostTip: 'Stop by the Kangra Tea Cooperative factory outlet nearby for authentic freshly-plucked orthodox tea tins.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    polaroidRotation: 'rotate-1'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-1082',
    guestName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98112 43210',
    roomType: 'dorm',
    roomName: 'Dorms (Bed #3)',
    checkIn: '2026-11-02',
    checkOut: '2026-11-06',
    guests: 1,
    nights: 4,
    totalAmount: 2796,
    status: 'confirmed',
    specialRequests: 'Arriving late on evening SpiceJet flight. Please keep locker key ready.',
    createdAt: '2026-10-29'
  },
  {
    id: 'BK-1083',
    guestName: 'Elena Rostova',
    email: 'elena.rostova@travelnomad.io',
    phone: '+44 7700 900142',
    roomType: 'private',
    roomName: 'Private rooms (Dhauladhar Suite)',
    checkIn: '2026-11-01',
    checkOut: '2026-11-08',
    guests: 2,
    nights: 7,
    totalAmount: 13293,
    status: 'confirmed',
    specialRequests: 'High-speed Wi-Fi required for remote tech sprint work.',
    createdAt: '2026-10-28'
  },
  {
    id: 'BK-1084',
    guestName: 'Karan Mehra',
    email: 'karan.mehra@gmail.com',
    phone: '+91 99201 88734',
    roomType: 'dorm',
    roomName: 'Dorms (Bed #6)',
    checkIn: '2026-11-03',
    checkOut: '2026-11-05',
    guests: 2,
    nights: 2,
    totalAmount: 2796,
    status: 'pending',
    specialRequests: 'Planning Triund trek on Nov 4th morning, interested in camping package.',
    createdAt: '2026-10-30'
  }
];

export const CONTACT_DETAILS = {
  name: 'Ghar by the Mountains',
  locationTag: 'Upper Dharamkot · Himachal Pradesh',
  address: 'Ghar by the Mountains Dharamkot, near Heena Cafe, Dharamkot, Dharamshala, Himachal Pradesh 176216',
  phones: [
    '+91 7303215324',
    '+91 6387718734',
    '+91 6392235194'
  ],
  primaryPhone: '+91 7303215324',
  email: 'ghardharamkot@gmail.com',
  instagram: 'https://www.instagram.com/ghar.dharamkot?mdxt=MTE2bTdoemxmZTJyYw%3D%3D&utm_source=qr',
  facebook: 'https://facebook.com',
  whatsappNumber: '917303215324',
  coordinates: {
    lat: 32.251642,
    lng: 76.329190,
    dms: `32°15'05.9"N 76°19'45.1"E`,
    googleMapsLink: 'https://www.google.com/maps?q=32.251642,76.329190',
    embedUrl: 'https://maps.google.com/maps?q=32.251642,76.329190&hl=en&z=16&output=embed'
  },
  altitude: '2,180 m (7,152 ft)',
  temperatureCurrent: '17°C',
  weatherSummary: 'Sunny & Crisp Alpine Breeze'
};
