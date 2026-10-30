import { Destination, Attraction, Experience, Trip, Expense, UserProfile } from '../types';

export const HERO_IMAGE = '/images/hero_cinematic_travel_1790533958047.jpg';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'East Asia',
    rating: 4.95,
    reviewsCount: 3420,
    heroImage: '/images/dest_kyoto_japan_1790533976072.jpg',
    thumbnail: '/images/dest_kyoto_japan_1790533976072.jpg',
    description: 'The cultural heart of Japan, Kyoto preserves over a thousand years of imperial history across zen stone gardens, torii-lined mountain trails, and whispering bamboo groves.',
    bestTime: 'March – May & October – November',
    avgTripDays: '5–7 days',
    budgetRange: { min: 900, max: 1500 },
    attractionsCount: 24,
    experiencesCount: 16,
    categories: ['Culture', 'History', 'Nature', 'Food'],
    coordinates: { lat: 35.0116, lng: 135.7681 },
    highlights: [
      'Fushimi Inari-taisha vermilion torii paths',
      'Arashiyama towering bamboo sanctuary',
      'Traditional Gion geisha district evening walk',
      'Golden Pavilion (Kinkaku-ji) reflection pond'
    ],
    travelTips: [
      'Purchase an IC transport card (Suica or ICOCA) for seamless train and bus travel.',
      'Visit Fushimi Inari either at sunrise (06:00) or after sunset to avoid midday tourist surges.',
      'Reserve traditional Kaiseki dining experiences at least 3 weeks in advance.',
      'Rent a bicycle to explore the peaceful residential alleys of Northern Higashiyama.'
    ],
    localFoods: [
      { name: 'Kyoto Kaiseki', description: 'Multi-course seasonal feast prepared with delicate artful techniques', price: '$85 - $160' },
      { name: 'Yudofu (Boiled Tofu)', description: 'Simmered fresh silken tofu served in hot broth with citrus ponzu', price: '$22 - $35' },
      { name: 'Matcha Parfait & Wagashi', description: 'Stone-ground Uji matcha soft cream with handcrafted seasonal confections', price: '$9 - $14' },
      { name: 'Nishin Soba', description: 'Warm buckwheat noodles crowned with sweet-simmered cured herring', price: '$14 - $18' }
    ]
  },
  {
    id: 'istanbul',
    name: 'Istanbul',
    country: 'Turkey',
    region: 'Eurasia',
    rating: 4.88,
    reviewsCount: 2850,
    heroImage: '/images/dest_istanbul_bosphorus_1790533991680.jpg',
    thumbnail: '/images/dest_istanbul_bosphorus_1790533991680.jpg',
    description: 'Where Europe meets Asia across the shimmering Bosphorus strait. Istanbul enchants with soaring Byzantine domes, Ottoman palaces, and intoxicating spice bazaars.',
    bestTime: 'April – June & September – November',
    avgTripDays: '4–6 days',
    budgetRange: { min: 700, max: 1200 },
    attractionsCount: 22,
    experiencesCount: 14,
    categories: ['History', 'Culture', 'Food', 'Adventure'],
    coordinates: { lat: 41.0082, lng: 28.9784 },
    highlights: [
      'Hagia Sophia architectural marvel',
      'Blue Mosque minarets at call to prayer',
      'Private sunset cruise on the Bosphorus',
      'Grand Bazaar labyrinth with 4,000 shops'
    ],
    travelTips: [
      'Take the public passenger ferry between Karaköy and Kadıköy for stunning views at low transit cost.',
      'Modest dress is required inside mosques; scarfs and knee coverings are provided at entrances.',
      'Bargain courteously at bazaars—start by offering 30% below initial quoted prices.'
    ],
    localFoods: [
      { name: 'Iskender Kebab', description: 'Tender shaved lamb over pita cubes with browned butter and yogurt', price: '$15 - $22' },
      { name: 'Balık Ekmek', description: 'Freshly grilled mackerel fillet sandwich served right off Bosphorus boats', price: '$5 - $8' },
      { name: 'Gaziantep Pistachio Baklava', description: 'Forty layers of whisper-thin filo filled with vibrant green Antep pistachios', price: '$8 - $12' }
    ]
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Southeast Asia',
    rating: 4.92,
    reviewsCount: 4120,
    heroImage: '/images/dest_bali_terraces_1790534006984.jpg',
    thumbnail: '/images/dest_bali_terraces_1790534006984.jpg',
    description: 'An island paradise of stepped emerald rice paddies, sacred sea temples, surf breaks, and spiritual healing sanctuaries nestled in volcanic highlands.',
    bestTime: 'May – September (Dry Season)',
    avgTripDays: '7–10 days',
    budgetRange: { min: 650, max: 1300 },
    attractionsCount: 28,
    experiencesCount: 18,
    categories: ['Nature', 'Beaches', 'Adventure', 'Luxury'],
    coordinates: { lat: -8.4095, lng: 115.1889 },
    highlights: [
      'Tegallalang terraced rice paddies in Ubud',
      'Mount Batur volcanic caldera sunrise trek',
      'Uluwatu clifftop temple & fire dance',
      'Nusa Penida coastal limestone cliffs'
    ],
    travelTips: [
      'Hire a private driver for full-day excursions—it is affordable, safe, and stress-free.',
      'Wear a traditional sarong and sash when entering holy Hindu water temples.',
      'Drink bottled or filtered water exclusively.'
    ],
    localFoods: [
      { name: 'Babi Guling', description: 'Slow-roasted suckling pig infused with lemongrass, turmeric, and coriander', price: '$8 - $14' },
      { name: 'Nasi Campur Bali', description: 'Fragrant steamed rice plate surrounded by 7 spicy Balinese delicacies', price: '$5 - $10' },
      { name: 'Bebek Betutu', description: 'Duck slow-smoked for 24 hours wrapped in banana leaves', price: '$18 - $28' }
    ]
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    region: 'Western Europe',
    rating: 4.91,
    reviewsCount: 5200,
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    description: 'The City of Light captivates travelers with grand Haussmannian boulevards, world-class art collections, zinc-roofed bistros, and iconic architectural monuments.',
    bestTime: 'April – June & September – October',
    avgTripDays: '5–7 days',
    budgetRange: { min: 1200, max: 2200 },
    attractionsCount: 32,
    experiencesCount: 20,
    categories: ['Culture', 'History', 'Food', 'Luxury'],
    coordinates: { lat: 48.8566, lng: 2.3522 },
    highlights: [
      'Musée du Louvre & Tuileries Garden',
      'Eiffel Tower twilight sparkle show',
      'Montmartre bohemian alleys & Sacré-Cœur',
      'Seine evening river cruise past Notre-Dame'
    ],
    travelTips: [
      'Book Louvre and Orsay tickets at least 2 weeks in advance to secure morning time-slots.',
      'Always greet shopkeepers with a polite "Bonjour Madame/Monsieur" before speaking.'
    ],
    localFoods: [
      { name: 'Steak Frites Béarnaise', description: 'Prime ribeye seared medium-rare with hand-cut fries and herb sauce', price: '$26 - $42' },
      { name: 'Warm Croissant & Cafe Crème', description: 'Flaky pure-butter pastry baked fresh at a neighborhood boulangerie', price: '$4 - $7' },
      { name: 'Canelé de Bordeaux', description: 'Caramelized crust with custardy vanilla-rum center', price: '$3 - $5' }
    ]
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    rating: 4.86,
    reviewsCount: 2600,
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    description: 'A futuristic desert metropolis where record-breaking skyscrapers rise beside ancient gold souks, luxury beach clubs, and sweeping golden sand dunes.',
    bestTime: 'November – March (Pleasant Winter)',
    avgTripDays: '4–6 days',
    budgetRange: { min: 1100, max: 2400 },
    attractionsCount: 20,
    experiencesCount: 15,
    categories: ['Luxury', 'Adventure', 'Food'],
    coordinates: { lat: 25.2048, lng: 55.2708 },
    highlights: [
      'Burj Khalifa Level 148 observation lounge',
      'Desert conservation reserve 4x4 dune drive',
      'Museum of the Future architectural wonder',
      'Dubai Marina night yacht cruise'
    ],
    travelTips: [
      'Visit between November and March when daytime temperatures stay around 25°C.',
      'Use the driverless Dubai Metro Red Line for easy transport between the Marina and Downtown.'
    ],
    localFoods: [
      { name: 'Emirati Machboos', description: 'Spiced aromatic basmati rice with slow-braised lamb and dried lime', price: '$22 - $35' },
      { name: 'Luqaimat', description: 'Crisp golden dumplings drizzled with rich date molasses and sesame', price: '$7 - $11' }
    ]
  },
  {
    id: 'cappadocia',
    name: 'Cappadocia',
    country: 'Turkey',
    region: 'Central Anatolia',
    rating: 4.96,
    reviewsCount: 3100,
    heroImage: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=600&q=80',
    description: 'A fairy-tale moonscape of fairy chimneys, subterranean troglodyte cities, and dawn skies filled with hundreds of colorful hot air balloons.',
    bestTime: 'May – June & September – October',
    avgTripDays: '3–4 days',
    budgetRange: { min: 600, max: 1100 },
    attractionsCount: 18,
    experiencesCount: 12,
    categories: ['Adventure', 'Nature', 'History', 'Hidden Gems'],
    coordinates: { lat: 38.6431, lng: 34.8289 },
    highlights: [
      'Sunrise hot air balloon flight over Love Valley',
      'Derinkuyu 8-level underground troglodyte city',
      'Göreme Open Air Museum rock-cut fresco churches',
      'Stay in an authentic carved stone cave suite'
    ],
    travelTips: [
      'Book your hot air balloon flight for the FIRST morning of your stay in case of wind cancellations.',
      'Bring a light windbreaker even in summer mornings as balloon ascents reach 800 meters.'
    ],
    localFoods: [
      { name: 'Testi Kebab', description: 'Tender beef and vegetables slow-baked inside a sealed clay jug cracked open table-side', price: '$18 - $26' },
      { name: 'Manti', description: 'Hand-pinched Anatolian mini dumplings served with garlic yogurt and spiced oil', price: '$12 - $17' }
    ]
  },
  {
    id: 'amalfi',
    name: 'Amalfi Coast',
    country: 'Italy',
    region: 'Southern Europe',
    rating: 4.93,
    reviewsCount: 2900,
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
    description: 'Pastel-hued cliffside villages cascading into cobalt Mediterranean waters, lemon groves, and winding cliffhanger roads along Italy’s romantic coastline.',
    bestTime: 'May – September',
    avgTripDays: '4–6 days',
    budgetRange: { min: 1300, max: 2500 },
    attractionsCount: 16,
    experiencesCount: 11,
    categories: ['Beaches', 'Luxury', 'Food', 'Culture'],
    coordinates: { lat: 40.6340, lng: 14.6027 },
    highlights: ['Positano cliff village sunset', 'Path of the Gods hiking trail', 'Private wooden gozzo boat to Capri', 'Villa Cimbrone infinity terrace'],
    travelTips: ['Use passenger ferries rather than buses to bypass narrow cliffside traffic bottlenecks.'],
    localFoods: [{ name: 'Spaghetti alle Vongole', description: 'Fresh clams tossed in garlic and olive oil', price: '$22 - $32' }]
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    region: 'Central Europe',
    rating: 4.97,
    reviewsCount: 3800,
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
    description: 'Dramatic snow-capped peaks, pristine alpine lakes, world-class panoramic mountain railways, and idyllic car-free villages like Zermatt and Wengen.',
    bestTime: 'December – March (Ski) or June – September (Hiking)',
    avgTripDays: '5–8 days',
    budgetRange: { min: 1600, max: 3000 },
    attractionsCount: 22,
    experiencesCount: 15,
    categories: ['Nature', 'Adventure', 'Luxury'],
    coordinates: { lat: 46.5601, lng: 8.5611 },
    highlights: ['Matterhorn reflection at Lake Riffelsee', 'Jungfraujoch Top of Europe railway', 'Glacier Express panoramic carriage'],
    travelTips: ['The Swiss Travel Pass offers unlimited train, bus, and lake boat travel.'],
    localFoods: [{ name: 'Traditional Cheese Fondue', description: 'Melted Gruyère and Emmental with white wine and crusty bread', price: '$32 - $45' }]
  },
  {
    id: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Southern Africa',
    rating: 4.89,
    reviewsCount: 2400,
    heroImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80',
    description: 'Dramatic Table Mountain vistas, rugged ocean headlands, sunbathing penguins on Boulders Beach, and world-renowned Cape Winelands.',
    bestTime: 'November – March',
    avgTripDays: '6–9 days',
    budgetRange: { min: 800, max: 1600 },
    attractionsCount: 25,
    experiencesCount: 16,
    categories: ['Nature', 'Adventure', 'Food', 'Beaches'],
    coordinates: { lat: -33.9249, lng: 18.4241 },
    highlights: ['Table Mountain rotating cable car', 'Cape Point coastal nature reserve', 'Franschhoek wine tram tour', 'Boulders Beach African penguin colony'],
    travelTips: ['Book Table Mountain cableway tickets online and monitor the weather wind forecast.'],
    localFoods: [{ name: 'Cape Malay Bobotie', description: 'Spiced minced beef baked with an egg custard crust and yellow rice', price: '$14 - $20' }]
  },
  {
    id: 'oaxaca',
    name: 'Oaxaca',
    country: 'Mexico',
    region: 'North America',
    rating: 4.92,
    reviewsCount: 1950,
    heroImage: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=600&q=80',
    description: 'Mexico’s culinary and artisanal capital. Revered for centuries-old mole recipes, ancestral smoky mezcal distilleries, and vibrant Zapotec textiles.',
    bestTime: 'October – April',
    avgTripDays: '4–6 days',
    budgetRange: { min: 550, max: 1050 },
    attractionsCount: 19,
    experiencesCount: 14,
    categories: ['Culture', 'Food', 'History', 'Hidden Gems'],
    coordinates: { lat: 17.0732, lng: -96.7266 },
    highlights: ['Monte Albán Zapotec ruins', 'Tasting 7 styles of complex Oaxacan mole', 'Ancestral mezcal distillery tasting', 'Hierve el Agua petrified mineral falls'],
    travelTips: ['Visit the 20 de Noviembre smoke alley for sizzling beef tasajo freshly grilled on coals.'],
    localFoods: [{ name: 'Mole Negro Oaxaqueño', description: 'Complex rich sauce simmered with 30 ingredients including chiles and Mexican cacao', price: '$12 - $18' }]
  },
  {
    id: 'reykjavik',
    name: 'Reykjavík',
    country: 'Iceland',
    region: 'Northern Europe',
    rating: 4.87,
    reviewsCount: 2200,
    heroImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
    description: 'Gateway to surreal volcanic wonders, glacier lagoons, roaring geothermal geysers, geothermal lagoons, and dancing Aurora Borealis skies.',
    bestTime: 'June – August (Midnight Sun) or Sept – March (Northern Lights)',
    avgTripDays: '5–8 days',
    budgetRange: { min: 1400, max: 2600 },
    attractionsCount: 21,
    experiencesCount: 15,
    categories: ['Nature', 'Adventure'],
    coordinates: { lat: 64.1466, lng: -21.9426 },
    highlights: ['Golden Circle geothermal route', 'Blue Lagoon silica mineral baths', 'Glacier ice cave exploration', 'Chasing Aurora Borealis in dark sky reserves'],
    travelTips: ['Rent a 4x4 vehicle if you intend to travel outside Route 1 into highland F-roads.'],
    localFoods: [{ name: 'Icelandic Arctic Char', description: 'Pan-seared fresh coldwater fish with wild herbs and buttered potatoes', price: '$28 - $38' }]
  },
  {
    id: 'queenstown',
    name: 'Queenstown',
    country: 'New Zealand',
    region: 'Oceania',
    rating: 4.94,
    reviewsCount: 2750,
    heroImage: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=600&q=80',
    description: 'The adventure capital of the Southern Hemisphere, framed by the jagged Remarkables range and crystalline waters of Lake Wakatipu.',
    bestTime: 'December – February (Summer) or July – August (Ski)',
    avgTripDays: '5–7 days',
    budgetRange: { min: 1100, max: 2100 },
    attractionsCount: 20,
    experiencesCount: 17,
    categories: ['Adventure', 'Nature', 'Luxury'],
    coordinates: { lat: -45.0312, lng: 168.6626 },
    highlights: ['Milford Sound scenic fjord cruise', 'Shotover River jet boat canyon ride', 'Skyline gondola overlooking Lake Wakatipu', 'Central Otago Pinot Noir winery tour'],
    travelTips: ['Take a day trip to Glenorchy and Routeburn Track for cinematic wilderness walks.'],
    localFoods: [{ name: 'Fergburger Gourmet Burger', description: 'Famous prime New Zealand beef burger with edam cheese and relish', price: '$12 - $17' }]
  }
];

export const INITIAL_ATTRACTIONS: Attraction[] = [
  // Kyoto Attractions
  {
    id: 'attr-fushimi-inari',
    destinationId: 'kyoto',
    name: 'Fushimi Inari-Taisha Shrine',
    category: 'Culture',
    durationHours: 2.5,
    price: 0,
    rating: 4.9,
    reviewsCount: 4210,
    image: '/images/dest_kyoto_japan_1790533976072.jpg',
    description: 'Famous mountain shrine dedicated to Inari, the Shinto spirit of agriculture, celebrated for its corridor of over 10,000 vivid vermilion torii gates.',
    address: '68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto',
    coordinates: { lat: 34.9671, lng: 135.7727 },
    openingHours: 'Open 24 hours',
    tip: 'Climb past the Yotsutsuji intersection for uncrowded paths and panoramic city views.'
  },
  {
    id: 'attr-arashiyama-bamboo',
    destinationId: 'kyoto',
    name: 'Arashiyama Bamboo Grove',
    category: 'Nature',
    durationHours: 1.5,
    price: 0,
    rating: 4.85,
    reviewsCount: 3100,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    description: 'An ethereal walking trail surrounded by soaring green bamboo stalks that sway and clatter melodically in the mountain breeze.',
    address: 'Sagatenryuji Miyanomacho, Ukyo Ward, Kyoto',
    coordinates: { lat: 35.0169, lng: 135.6713 },
    openingHours: 'Open 24 hours',
    tip: 'Combine with the neighboring Tenryu-ji Zen temple garden.'
  },
  {
    id: 'attr-kiyomizu-dera',
    destinationId: 'kyoto',
    name: 'Kiyomizu-dera Temple',
    category: 'History',
    durationHours: 2.0,
    price: 4,
    rating: 4.92,
    reviewsCount: 3890,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic UNESCO heritage wooden temple perched on Mount Otowa, built entirely without a single nail and overlooking cherry blossom valleys.',
    address: '1 Chome-294 Kiyomizu, Higashiyama Ward, Kyoto',
    coordinates: { lat: 34.9949, lng: 135.7850 },
    openingHours: '06:00 - 18:00',
    tip: 'Drink from the Otowa Waterfall three streams for health, longevity, or success in studies.'
  },
  {
    id: 'attr-gion-district',
    destinationId: 'kyoto',
    name: 'Gion Historic Geisha Quarter',
    category: 'Culture',
    durationHours: 2.0,
    price: 0,
    rating: 4.88,
    reviewsCount: 2600,
    image: '/images/dest_kyoto_japan_1790533976072.jpg',
    description: 'Atmospheric cobblestone lanes lined with 17th-century wooden machiya merchant houses, ochaya teahouses, and glowing red lanterns.',
    address: 'Gionmachi Minamigawa, Higashiyama Ward, Kyoto',
    coordinates: { lat: 35.0037, lng: 135.7770 },
    openingHours: 'Best enjoyed dusk to evening',
    tip: 'Observe quiet respect; photographing geiko and maiko on private side alleys is strictly prohibited.'
  },
  {
    id: 'attr-kinkaku-ji',
    destinationId: 'kyoto',
    name: 'Kinkaku-ji (Golden Pavilion)',
    category: 'History',
    durationHours: 1.5,
    price: 5,
    rating: 4.84,
    reviewsCount: 3100,
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80',
    description: 'A Zen temple whose top two floors are completely covered in pure gold leaf, reflected in the mirror-like Kyoko-chi pond.',
    address: '1 Kinkakujicho, Kita Ward, Kyoto',
    coordinates: { lat: 35.0394, lng: 135.7292 },
    openingHours: '09:00 - 17:00',
    tip: 'Visit in the early afternoon when the sun directly strikes the golden exterior.'
  },

  // Istanbul Attractions
  {
    id: 'attr-hagia-sophia',
    destinationId: 'istanbul',
    name: 'Hagia Sophia Grand Mosque',
    category: 'History',
    durationHours: 2.5,
    price: 25,
    rating: 4.94,
    reviewsCount: 5100,
    image: '/images/dest_istanbul_bosphorus_1790533991680.jpg',
    description: 'An architectural wonder of the ancient world with a massive unsupported dome that has stood as a cathedral, museum, and mosque for 1,500 years.',
    address: 'Sultan Ahmet, Ayasofya Meydanı, Fatih/Istanbul',
    coordinates: { lat: 41.0086, lng: 28.9802 },
    openingHours: '09:00 - 19:30',
    tip: 'Visit upper gallery level to inspect golden Byzantine mosaics of Christ Pantocrator.'
  },
  {
    id: 'attr-blue-mosque',
    destinationId: 'istanbul',
    name: 'Sultanahmet (Blue Mosque)',
    category: 'Culture',
    durationHours: 1.5,
    price: 0,
    rating: 4.86,
    reviewsCount: 4100,
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80',
    description: 'Six towering minarets and an interior clad in over 20,000 handmade cobalt blue ceramic tiles from Iznik.',
    address: 'Sultan Ahmet, Atmeydanı Cd. No:7, Fatih/Istanbul',
    coordinates: { lat: 41.0054, lng: 28.9768 },
    openingHours: '08:30 - 18:30 (Closes during prayer times)',
    tip: 'Dress modestly with shoulders and knees covered; scarfs available at security.'
  },
  {
    id: 'attr-basilica-cistern',
    destinationId: 'istanbul',
    name: 'Basilica Cistern (Yerebatan Sarnıcı)',
    category: 'Hidden Gems',
    durationHours: 1.5,
    price: 18,
    rating: 4.91,
    reviewsCount: 3400,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    description: 'A subterranean forest of 336 marble columns lit with dramatic art installations and shallow pools with upside-down Medusa heads.',
    address: 'Alemdar, Yerebatan Cd. 1/3, Fatih/Istanbul',
    coordinates: { lat: 41.0084, lng: 28.9778 },
    openingHours: '09:00 - 22:00',
    tip: 'Evening illumination showcases contemporary sculptures reflecting in the water.'
  },

  // Bali Attractions
  {
    id: 'attr-tegallalang',
    destinationId: 'bali',
    name: 'Tegallalang Rice Terraces',
    category: 'Nature',
    durationHours: 2.5,
    price: 3,
    rating: 4.88,
    reviewsCount: 4500,
    image: '/images/dest_bali_terraces_1790534006984.jpg',
    description: 'Hand-sculpted emerald valleys using the ancient 9th-century Subak cooperative irrigation system, framed by towering coconut palms.',
    address: 'Jl. Raya Tegallalang, Gianyar, Bali',
    coordinates: { lat: -8.4333, lng: 115.2810 },
    openingHours: '07:00 - 18:00',
    tip: 'Arrive at 07:00 for golden morning sunbeams cutting through morning dew.'
  },
  {
    id: 'attr-uluwatu-temple',
    destinationId: 'bali',
    name: 'Uluwatu Clifftop Temple',
    category: 'Culture',
    durationHours: 2.0,
    price: 5,
    rating: 4.91,
    reviewsCount: 3900,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    description: 'Perched on a sheer 70-meter limestone cliff overlooking crashing Indian Ocean surf, famous for nightly Kecak fire dance performances.',
    address: 'Pecatu, South Kuta, Badung Regency, Bali',
    coordinates: { lat: -8.8290, lng: 115.0849 },
    openingHours: '07:00 - 19:00',
    tip: 'Secure sunglasses and phone from the cheeky temple monkeys.'
  },

  // Paris Attractions
  {
    id: 'attr-louvre',
    destinationId: 'paris',
    name: 'Musée du Louvre',
    category: 'Culture',
    durationHours: 3.5,
    price: 22,
    rating: 4.92,
    reviewsCount: 6100,
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
    description: 'The world’s largest art museum holding over 35,000 masterworks including the Mona Lisa, Winged Victory of Samothrace, and Venus de Milo.',
    address: 'Rue de Rivoli, 75001 Paris',
    coordinates: { lat: 48.8606, lng: 2.3376 },
    openingHours: '09:00 - 18:00 (Wed/Fri until 21:45)',
    tip: 'Enter via the Carrousel du Louvre underground mall to skip the pyramid surface line.'
  },
  {
    id: 'attr-eiffel-tower',
    destinationId: 'paris',
    name: 'Eiffel Tower & Champ de Mars',
    category: 'History',
    durationHours: 2.0,
    price: 29,
    rating: 4.89,
    reviewsCount: 7800,
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80',
    description: 'Gustave Eiffel’s wrought-iron lattice monument rising 330 meters above the River Seine, offering panoramic vistas across Paris.',
    address: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris',
    coordinates: { lat: 48.8584, lng: 2.2945 },
    openingHours: '09:30 - 23:45',
    tip: 'Book Summit lift tickets exactly 60 days in advance at midnight Paris time.'
  }
];

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: 'exp-kyoto-tea',
    destinationId: 'kyoto',
    destinationName: 'Kyoto, Japan',
    title: 'Private Zen Tea Ceremony & Meditation',
    category: 'Culture',
    durationHours: 2.5,
    price: 85,
    rating: 4.96,
    reviewsCount: 310,
    image: '/images/dest_kyoto_japan_1790533976072.jpg',
    description: 'Learn the ancient philosophy of Ichigo Ichie (one time, one meeting) with a 15th-generation tea master inside a tranquil 300-year-old wooden monastery.',
    locationName: 'Daitoku-ji Temple Enclave, Kyoto',
    includes: ['Ceremonial matcha whisking', 'Handmade seasonal wagashi', 'Zen garden walking tour', 'English tea master translation']
  },
  {
    id: 'exp-batur-sunrise',
    destinationId: 'bali',
    destinationName: 'Bali, Indonesia',
    title: 'Sunrise Trek to Mount Batur Caldera',
    category: 'Adventure',
    durationHours: 5.0,
    price: 65,
    rating: 4.94,
    reviewsCount: 840,
    image: '/images/dest_bali_terraces_1790534006984.jpg',
    description: 'Hike under starry skies to the summit of active Mount Batur volcano (1,717m) to witness dawn breaking over Lake Batur and Mount Agung.',
    locationName: 'Kintamani Highlands, Bali',
    includes: ['Summit volcanic breakfast', 'Private mountain guide', 'Headlamp & trekking poles', 'Hot springs soaking access']
  },
  {
    id: 'exp-bosphorus-sunset',
    destinationId: 'istanbul',
    destinationName: 'Istanbul, Turkey',
    title: 'Private Sunset Yacht on the Bosphorus',
    category: 'Luxury',
    durationHours: 2.5,
    price: 120,
    rating: 4.97,
    reviewsCount: 420,
    image: '/images/dest_istanbul_bosphorus_1790533991680.jpg',
    description: 'Glide between Europe and Asia past illuminated Ottoman waterfront palaces, fortress ruins, and shimmering bridges with meze platters and Turkish wine.',
    locationName: 'Bebek Marina, Istanbul',
    includes: ['Private 45ft motor yacht', 'Artisanal meze appetizers', 'Local Turkish wines & tea', 'Captain & onboard guide']
  },
  {
    id: 'exp-cappadocia-balloon',
    destinationId: 'cappadocia',
    destinationName: 'Cappadocia, Turkey',
    title: 'Dawn Hot Air Balloon Expedition',
    category: 'Adventure',
    durationHours: 3.5,
    price: 210,
    rating: 4.98,
    reviewsCount: 1250,
    image: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=800&q=80',
    description: 'Ascend into the calm dawn sky over fairy chimneys and rose-colored volcanic canyons accompanied by a fleet of over 100 vibrant balloons.',
    locationName: 'Göreme Valley, Cappadocia',
    includes: ['1-hour scenic balloon flight', 'Light morning pastry buffet', 'Post-landing champagne toast', 'Flight certificate']
  },
  {
    id: 'exp-paris-pastry',
    destinationId: 'paris',
    destinationName: 'Paris, France',
    title: 'Master French Pastry & Macaron Workshop',
    category: 'Food',
    durationHours: 3.0,
    price: 95,
    rating: 4.93,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    description: 'Bake with a master French pâtissier in a Saint-Germain loft. Craft crisp macaron shells, chocolate ganache, and delicate fruit tarts from scratch.',
    locationName: 'Saint-Germain-des-Prés, Paris',
    includes: ['All baking ingredients', 'Box of 12 handcrafted macarons to take home', 'Recipe booklet', 'Espresso and tea service']
  },
  {
    id: 'exp-dubai-desert',
    destinationId: 'dubai',
    destinationName: 'Dubai, UAE',
    title: 'Heritage Desert Safari & Bedouin Dinner',
    category: 'Adventure',
    durationHours: 6.0,
    price: 135,
    rating: 4.91,
    reviewsCount: 650,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    description: 'Traverse rolling sand dunes in a vintage 1950s Land Rover, watch falconry demonstrations, and dine under desert stars with live oud musicians.',
    locationName: 'Dubai Desert Conservation Reserve',
    includes: ['Vintage 4x4 dune transport', 'Falconry exhibition', 'Traditional 4-course Bedouin dinner', 'Camel caravan ride']
  },
  {
    id: 'exp-amalfi-boat',
    destinationId: 'amalfi',
    destinationName: 'Amalfi Coast, Italy',
    title: 'Capri & Blue Grotto Classic Gozzo Cruise',
    category: 'Luxury',
    durationHours: 6.5,
    price: 165,
    rating: 4.95,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    description: 'Sail the crystalline waters of the Faraglioni rocks, explore hidden sea caves, swim in secluded turquoise bays, and dock in Capri for limoncello.',
    locationName: 'Positano Pier, Italy',
    includes: ['Wooden Italian gozzo boat', 'Snorkeling gear', 'Prosecco & caprese sandwiches', 'Capri island docking']
  },
  {
    id: 'exp-swiss-glacier',
    destinationId: 'swiss-alps',
    destinationName: 'Swiss Alps, Switzerland',
    title: 'Alpine Glacier Walk & High Mountain Fondue',
    category: 'Nature',
    durationHours: 4.5,
    price: 145,
    rating: 4.96,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    description: 'Equip crampons to navigate blue crevasse fields on the Aletsch Glacier, followed by traditional molten cheese fondue inside a cozy mountain refuge.',
    locationName: 'Zermatt / Gornergrat, Switzerland',
    includes: ['Glacier guide & technical gear', 'Warm fondue meal & alpine wine', 'Cable car discount voucher']
  }
];

export const INITIAL_TRIPS: Trip[] = [
  {
    id: 'trip-japan-adventure',
    title: 'Japan Adventure — Temples, Traditions & Neon',
    destinationId: 'kyoto',
    destinationName: 'Kyoto',
    country: 'Japan',
    coverImage: '/images/dest_kyoto_japan_1790533976072.jpg',
    startDate: '2026-10-12',
    endDate: '2026-10-19',
    durationDays: 7,
    totalBudget: 1420,
    spentBudget: 890,
    status: 'upcoming',
    shareableCode: 'TV-JAP-8841',
    notes: 'JR Pass pre-ordered. Remember comfortable slip-on shoes for temple entry.',
    days: [
      {
        dayNumber: 1,
        title: 'Arrival & Old City Kyoto',
        date: 'Oct 12, 2026',
        activities: [
          {
            id: 'act-1-1',
            time: '09:00',
            title: 'Hotel Check-in & Ryokan Tea Welcome',
            location: 'Kyoto Ryokan Gion Sano',
            durationMinutes: 60,
            cost: 180,
            category: 'Accommodation',
            notes: 'Leave luggage with front desk concierge and receive local transit maps.'
          },
          {
            id: 'act-1-2',
            time: '11:00',
            title: 'Historic Higashiyama Stroll',
            location: 'Ninenzaka & Sannenzaka Slopes',
            durationMinutes: 120,
            cost: 0,
            category: 'Activities',
            notes: 'Stone alleys lined with incense shops and wooden tea houses.'
          },
          {
            id: 'act-1-3',
            time: '14:00',
            title: 'Nishiki Market Culinary Tour',
            location: 'Nishiki Market Arcade',
            durationMinutes: 90,
            cost: 35,
            category: 'Food',
            notes: 'Try tako tamago (baby octopus stuffed with quail egg) and soy milk donuts.'
          },
          {
            id: 'act-1-4',
            time: '18:30',
            title: 'Kiyomizu-dera Sunset Viewpoint',
            location: 'Kiyomizu-dera Temple Terrace',
            durationMinutes: 90,
            cost: 4,
            category: 'Activities',
            notes: 'Watch golden twilight settle over Kyoto valley from the massive wooden stage.'
          }
        ]
      },
      {
        dayNumber: 2,
        title: 'Torii Gates & Southern Kyoto',
        date: 'Oct 13, 2026',
        activities: [
          {
            id: 'act-2-1',
            time: '06:30',
            title: 'Early Morning Fushimi Inari Trek',
            location: 'Fushimi Inari-Taisha',
            durationMinutes: 150,
            cost: 0,
            category: 'Activities',
            notes: 'Beat the morning crowd up the 4km mountain trail through 10,000 orange gates.'
          },
          {
            id: 'act-2-2',
            time: '12:00',
            title: 'Traditional Tofu Lunch at Tosuiro',
            location: 'Tosuiro Kiyamachi',
            durationMinutes: 75,
            cost: 45,
            category: 'Food',
            notes: 'Multi-course Obanzai tofu meal beside the Kamo River.'
          },
          {
            id: 'act-2-3',
            time: '15:30',
            title: 'Tofuku-ji Zen Rock Gardens',
            location: 'Tofuku-ji Temple',
            durationMinutes: 90,
            cost: 8,
            category: 'Activities',
            notes: 'Famous Hojo checkerboard moss garden and Tsutenkyo wooden bridge.'
          }
        ]
      },
      {
        dayNumber: 3,
        title: 'Arashiyama Bamboo & River Boat',
        date: 'Oct 14, 2026',
        activities: [
          {
            id: 'act-3-1',
            time: '08:30',
            title: 'Arashiyama Bamboo Sanctuary Walk',
            location: 'Bamboo Forest Path',
            durationMinutes: 75,
            cost: 0,
            category: 'Activities',
            notes: 'Listen to the rustling wind rated among the top 100 soundscapes of Japan.'
          },
          {
            id: 'act-3-2',
            time: '10:30',
            title: 'Tenryu-ji Dragon Pond Garden',
            location: 'Tenryu-ji Temple',
            durationMinutes: 60,
            cost: 5,
            category: 'Activities',
            notes: '14th-century pond garden designed by Zen master Muso Soseki.'
          },
          {
            id: 'act-3-3',
            time: '14:00',
            title: 'Hozugawa Wooden Riverboat Cruise',
            location: 'Kameoka Pier to Arashiyama',
            durationMinutes: 110,
            cost: 40,
            category: 'Transport',
            notes: 'Traditional oarsmen steering through dramatic forested river gorges.'
          }
        ]
      },
      {
        dayNumber: 4,
        title: 'Osaka Food & Neon Day Trip',
        date: 'Oct 15, 2026',
        activities: [
          {
            id: 'act-4-1',
            time: '09:00',
            title: 'Rapid Train to Osaka Station',
            location: 'Kyoto to Osaka JR Special Rapid',
            durationMinutes: 35,
            cost: 12,
            category: 'Transport',
            notes: 'Direct 29-minute transit on the Tokaido line.'
          },
          {
            id: 'act-4-2',
            time: '11:00',
            title: 'Osaka Castle & Moat Park',
            location: 'Osaka Castle Keep',
            durationMinutes: 120,
            cost: 6,
            category: 'Activities',
            notes: 'Eight-story samurai history museum and rooftop panoramic lookout.'
          },
          {
            id: 'act-4-3',
            time: '17:30',
            title: 'Dotonbori Street Food Feast',
            location: 'Dotonbori Canal',
            durationMinutes: 180,
            cost: 50,
            category: 'Food',
            notes: 'Takoyaki octopus balls, okonomiyaki pancakes, and Glico Running Man sign.'
          }
        ]
      },
      {
        dayNumber: 5,
        title: 'Tea Masters & Zen Philosophy',
        date: 'Oct 16, 2026',
        activities: [
          {
            id: 'act-5-1',
            time: '10:00',
            title: 'Private Zen Tea Ceremony Experience',
            location: 'Daitoku-ji Temple Enclave',
            durationMinutes: 120,
            cost: 85,
            category: 'Activities',
            notes: 'Hands-on ceremonial matcha preparation and quiet contemplation.'
          },
          {
            id: 'act-5-2',
            time: '14:30',
            title: 'Philosopher’s Path Canal Walk',
            location: 'Tetsugaku-no-Michi',
            durationMinutes: 90,
            cost: 0,
            category: 'Activities',
            notes: 'Stone path alongside canal shaded by cherry trees and small craft boutiques.'
          }
        ]
      },
      {
        dayNumber: 6,
        title: 'Kinkaku-ji & Onsen Relaxation',
        date: 'Oct 17, 2026',
        activities: [
          {
            id: 'act-6-1',
            time: '09:30',
            title: 'Golden Pavilion (Kinkaku-ji)',
            location: 'Kita Ward, Kyoto',
            durationMinutes: 75,
            cost: 5,
            category: 'Activities',
            notes: 'Mirrored gold leaf facade over the tranquil pond.'
          },
          {
            id: 'act-6-2',
            time: '14:00',
            title: 'Kurama Mountain Forest Onsen',
            location: 'Kurama Hot Spring Baths',
            durationMinutes: 150,
            cost: 25,
            category: 'Activities',
            notes: 'Outdoor cedar soaking pool overlooking cedar mountain peaks.'
          }
        ]
      },
      {
        dayNumber: 7,
        title: 'Souvenirs & Kansai Airport Departure',
        date: 'Oct 18, 2026',
        activities: [
          {
            id: 'act-7-1',
            time: '10:00',
            title: 'Handmade Kyoto Crafts Shopping',
            location: 'Kyoto Handicraft Center',
            durationMinutes: 90,
            cost: 95,
            category: 'Shopping',
            notes: 'Kiyomizu-yaki ceramics, green tea leaves, and woodblock prints.'
          },
          {
            id: 'act-7-2',
            time: '13:00',
            title: 'Haruka Express Train to Airport',
            location: 'Kyoto Station to KIX',
            durationMinutes: 80,
            cost: 32,
            category: 'Transport',
            notes: 'Reserved seats on direct airport express line.'
          }
        ]
      }
    ]
  },
  {
    id: 'trip-turkey-discovery',
    title: 'Turkey Odyssey — Bosphorus to Cappadocia',
    destinationId: 'istanbul',
    destinationName: 'Istanbul & Cappadocia',
    country: 'Turkey',
    coverImage: '/images/dest_istanbul_bosphorus_1790533991680.jpg',
    startDate: '2026-11-04',
    endDate: '2026-11-10',
    durationDays: 6,
    totalBudget: 1100,
    spentBudget: 620,
    status: 'upcoming',
    shareableCode: 'TV-TUR-5129',
    days: [
      {
        dayNumber: 1,
        title: 'Imperial Istanbul Heritage',
        date: 'Nov 04, 2026',
        activities: [
          { id: 'act-t1', time: '10:00', title: 'Hagia Sophia Grand Mosque', location: 'Sultanahmet', durationMinutes: 120, cost: 25, category: 'Activities', notes: 'Explore upper gallery mosaics.' },
          { id: 'act-t2', time: '14:00', title: 'Basilica Cistern Walkway', location: 'Yerebatan Sarnıcı', durationMinutes: 75, cost: 18, category: 'Activities', notes: 'Find Medusa carved stone bases.' }
        ]
      },
      {
        dayNumber: 2,
        title: 'Bosphorus Twilight Cruise',
        date: 'Nov 05, 2026',
        activities: [
          { id: 'act-t3', time: '16:30', title: 'Private Bosphorus Sunset Yacht', location: 'Bebek Pier', durationMinutes: 150, cost: 120, category: 'Activities', notes: 'Meze and Turkish wine.' }
        ]
      }
    ]
  },
  {
    id: 'trip-bali-sanctuary',
    title: 'Bali Sanctuary — Water Temples & Sunrise Treks',
    destinationId: 'bali',
    destinationName: 'Bali',
    country: 'Indonesia',
    coverImage: '/images/dest_bali_terraces_1790534006984.jpg',
    startDate: '2026-08-15',
    endDate: '2026-08-23',
    durationDays: 8,
    totalBudget: 950,
    spentBudget: 950,
    status: 'past',
    shareableCode: 'TV-BAL-3310',
    days: []
  },
  {
    id: 'trip-paris-haute',
    title: 'Parisian Autumn — Art & Michelin Dining',
    destinationId: 'paris',
    destinationName: 'Paris',
    country: 'France',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-10-20',
    endDate: '2026-10-26',
    durationDays: 6,
    totalBudget: 1800,
    spentBudget: 420,
    status: 'draft',
    shareableCode: 'TV-PAR-7790',
    days: []
  },
  {
    id: 'trip-amalfi-sun',
    title: 'Amalfi Coastline & Capri Charter',
    destinationId: 'amalfi',
    destinationName: 'Amalfi Coast',
    country: 'Italy',
    coverImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-06-10',
    endDate: '2026-06-16',
    durationDays: 6,
    totalBudget: 2200,
    spentBudget: 2200,
    status: 'past',
    shareableCode: 'TV-ITA-4412',
    days: []
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  { id: 'exp-1', tripId: 'trip-japan-adventure', category: 'Accommodation', title: 'Kyoto Ryokan 3-Night Stay', amount: 380, date: '2026-10-12', paymentMethod: 'Credit Card' },
  { id: 'exp-2', tripId: 'trip-japan-adventure', category: 'Transport', title: 'JR Kansai Rail Pass', amount: 95, date: '2026-10-12', paymentMethod: 'Apple Pay' },
  { id: 'exp-3', tripId: 'trip-japan-adventure', category: 'Activities', title: 'Private Zen Tea Ceremony', amount: 85, date: '2026-10-13', paymentMethod: 'Credit Card' },
  { id: 'exp-4', tripId: 'trip-japan-adventure', category: 'Food', title: 'Kaiseki Dinner at Gion', amount: 140, date: '2026-10-13', paymentMethod: 'Cash' },
  { id: 'exp-5', tripId: 'trip-japan-adventure', category: 'Food', title: 'Nishiki Market Street Food', amount: 35, date: '2026-10-12', paymentMethod: 'Cash' },
  { id: 'exp-6', tripId: 'trip-japan-adventure', category: 'Shopping', title: 'Kyoto Handcrafted Ceramics', amount: 95, date: '2026-10-14', paymentMethod: 'Credit Card' },
  { id: 'exp-7', tripId: 'trip-japan-adventure', category: 'Activities', title: 'Hozugawa River Boat Tickets', amount: 40, date: '2026-10-14', paymentMethod: 'Credit Card' },
  { id: 'exp-8', tripId: 'trip-japan-adventure', category: 'Other', title: 'Pocket WiFi & Travel Insurance', amount: 20, date: '2026-10-11', paymentMethod: 'Credit Card' }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-1',
  name: 'Elena Rostova',
  email: 'elena.rostova@travelverse.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  role: 'Explorer',
  tripsCompleted: 14,
  countriesVisited: 28,
  savedPlacesCount: 42,
  bio: 'Architectural photographer and slow-travel advocate. Seeking centuries-old traditions, morning light over ancient ruins, and quiet cobblestone alleys.',
  travelStyles: ['Culture', 'Slow Travel', 'Architecture', 'Nature', 'Fine Gastronomy'],
  favoriteDestinations: ['Kyoto, Japan', 'Cappadocia, Turkey', 'Amalfi Coast, Italy', 'Reykjavík, Iceland'],
  homeAirport: 'HND / NRT (Tokyo)'
};

export const SAMPLE_ADMIN_USERS = [
  { id: 'u1', name: 'Elena Rostova', email: 'elena@travelverse.io', role: 'Explorer', trips: 14, status: 'Active', joined: 'Mar 2025' },
  { id: 'u2', name: 'Marcus Vance', email: 'marcus.v@gmail.com', role: 'Traveler', trips: 6, status: 'Active', joined: 'Apr 2025' },
  { id: 'u3', name: 'Aaliyah Chen', email: 'aaliyah.c@design.co', role: 'Traveler', trips: 9, status: 'Active', joined: 'May 2025' },
  { id: 'u4', name: 'Liam O’Connor', email: 'liam.oc@outlook.com', role: 'Explorer', trips: 22, status: 'Active', joined: 'Jun 2025' },
  { id: 'u5', name: 'Sofia Rodriguez', email: 'sofia.r@studio.es', role: 'Traveler', trips: 4, status: 'Active', joined: 'Aug 2025' },
  { id: 'u6', name: 'Hiroshi Tanaka', email: 'tanaka.h@kyoto.jp', role: 'Explorer', trips: 18, status: 'Active', joined: 'Sep 2025' },
  { id: 'u7', name: 'Camille Laurent', email: 'camille@bordeaux.fr', role: 'Traveler', trips: 3, status: 'Inactive', joined: 'Nov 2025' },
  { id: 'u8', name: 'Zayn Al-Mansoor', email: 'zayn@emirates.ae', role: 'Traveler', trips: 8, status: 'Active', joined: 'Jan 2026' }
];

export const CATEGORIES_LIST: { id: string; name: string; icon: string; count: number }[] = [
  { id: 'Adventure', name: 'Adventure', icon: 'Compass', count: 48 },
  { id: 'Nature', name: 'Nature', icon: 'Trees', count: 62 },
  { id: 'Culture', name: 'Culture', icon: 'Landmark', count: 75 },
  { id: 'Food', name: 'Food', icon: 'Utensils', count: 54 },
  { id: 'Beaches', name: 'Beaches', icon: 'Sun', count: 39 },
  { id: 'History', name: 'History', icon: 'Scroll', count: 66 },
  { id: 'Luxury', name: 'Luxury', icon: 'Sparkles', count: 41 },
  { id: 'Hidden Gems', name: 'Hidden Gems', icon: 'Gem', count: 33 }
];
