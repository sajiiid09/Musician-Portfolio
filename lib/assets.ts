/**
 * Cremain Asset Configuration
 * Centralized mapping of all media assets for the Cremain website
 */

// ============================================
// BAND MEMBERS - Photos
// ============================================
export const BAND_MEMBERS = [
  {
    id: 1,
    name: 'Sakib',
    role: 'Vocals',
    img: '/Photos of Cremain /TIS03219.JPG',
  },
  {
    id: 2,
    name: 'Labib',
    role: 'Guitars',
    img: '/Photos of Cremain /TIS03294.JPG',
  },
  {
    id: 3,
    name: 'Ayman',
    role: 'Guitars',
    img: '/Photos of Cremain /TIS03398.JPG',
  },
  {
    id: 4,
    name: 'Siam',
    role: 'Bass',
    img: '/Photos of Cremain /TIS03461.JPG',
  },
  {
    id: 5,
    name: 'Shadman',
    role: 'Keys',
    img: '/Photos of Cremain /TIS03500.JPG',
  },
  {
    id: 6,
    name: 'Irad',
    role: 'Drums',
    img: '/Photos of Cremain /WhatsApp Image 2026-01-08 at 10.51.12 PM.jpeg',
  },
] as const;

// ============================================
// ALBUM - Dear Melancholia
// ============================================
export const ALBUM_DEAR_MELANCHOLIA = {
  title: 'Dear Melancholia',
  cover: '/Dear Melancholia (Album Cover)/Cremain - Dear Melancholia Cover Artwork 2025 - Updated version 8.png',
  releaseYear: '2026',
  tracks: [
    {
      id: 1,
      title: 'Ravens Calling',
      cover: '/Dear Melancholia track artworks /1. Ravens Calling.jpg',
    },
    {
      id: 2,
      title: 'Lost',
      cover: '/Dear Melancholia track artworks /2. Lost.jpg',
    },
    {
      id: 3,
      title: 'Nei',
      cover: '/Dear Melancholia track artworks /3. Nei.jpg',
    },
    {
      id: 4,
      title: 'Sinner',
      cover: '/Dear Melancholia track artworks /4. Sinner.jpg',
    },
    {
      id: 5,
      title: 'Jonoshunnota',
      cover: '/Dear Melancholia track artworks /5. Jonoshunnota.jpg',
    },
    {
      id: 6,
      title: 'Help',
      cover: '/Dear Melancholia track artworks /6. Help.jpg',
    },
  ],
} as const;

// ============================================
// SINGLE - Sinner (Teaser)
// ============================================
export const SINGLE_SINNER = {
  title: 'Sinner',
  video: '/Sinner Teasers /Sinner Teaser 3.mp4',
  cover: '/Dear Melancholia track artworks /4. Sinner.jpg',
} as const;

// ============================================
// LOGOS
// ============================================
export const LOGOS = {
  white: '/Logo and symbol/white-logo.png',
  black: '/Logo and symbol/Black-logo.png',
  symbolWhite: '/Logo and symbol/white copy Symbol.png',
  symbolBlack: '/Logo and symbol/black copy Symbol.png',
} as const;

// ============================================
// GALLERY PHOTOS
// ============================================
export const GALLERY_PHOTOS = [
  '/Photos/DSC_3587.jpg',
  '/Photos/IMG_1907.jpg',
  '/Photos/IMG_1917.jpg',
  '/Photos/IMG_1920.jpg',
  '/Photos/IMG_2892.png',
  '/Photos/IMG_3493.jpg',
  '/Photos/20251107_172929.png',
  '/Photos/IMG-20251108-WA0076.png',
  '/Photos/IMG-20251108-WA0094.png',
  '/Photos/1.png',
] as const;

// ============================================
// VINYL CARD ASSETS
// ============================================
export const VINYL_ASSETS = {
  // Note: Vinyl record and sleeve images are not currently available in the public folder
  // Using placeholder URLs that should be replaced when available
  sleeve: '/Logo and symbol/white-logo.png', // Fallback to logo
  vinyl: '/Logo and symbol/white-logo.png', // Fallback to logo
  logo: '/Logo and symbol/white-logo.png',
} as const;

// ============================================
// STORE PRODUCTS (Mock Data - will need actual images)
// ============================================
export const STORE_PRODUCTS = [
  {
    id: '1',
    title: 'Dear Melancholia - Digital Album',
    price: '$ 10.00 USD',
    originalPrice: '$ 12.00 USD',
    image: '/Dear Melancholia (Album Cover)/Cremain - Dear Melancholia Cover Artwork 2025 - Updated version 8.png',
    category: 'Digital',
    isSale: true,
  },
  {
    id: '2',
    title: 'Dear Melancholia - Vinyl LP',
    price: '$ 30.00 USD',
    originalPrice: '$ 35.00 USD',
    image: '/Dear Melancholia (Album Cover)/Cremain - Dear Melancholia Cover Artwork 2025 - Updated version 8.png',
    category: 'Vinyl',
    isSale: true,
  },
  {
    id: '3',
    title: 'Cremain T-Shirt - Black',
    price: '$ 25.00 USD',
    originalPrice: '$ 30.00 USD',
    image: '/Logo and symbol/white-logo.png',
    category: 'Clothing',
    isSale: true,
  },
  {
    id: '4',
    title: 'Cremain T-Shirt - White',
    price: '$ 25.00 USD',
    originalPrice: '$ 30.00 USD',
    image: '/Logo and symbol/Black-logo.png',
    category: 'Clothing',
    isSale: true,
  },
  {
    id: '5',
    title: 'Cremain Logo Sticker Pack',
    price: '$ 5.00 USD',
    originalPrice: '$ 8.00 USD',
    image: '/Logo and symbol/white copy Symbol.png',
    category: 'Merch',
    isSale: true,
  },
  {
    id: '6',
    title: 'Dear Melancholia - Poster',
    price: '$ 15.00 USD',
    originalPrice: '$ 20.00 USD',
    image: '/Dear Melancholia (Album Cover)/Cremain - Dear Melancholia Cover Artwork 2025 - Updated version 8.png',
    category: 'Print',
    isSale: true,
  },
] as const;

// ============================================
// STREAMING LINKS
// ============================================
export const STREAMING_LINKS = [
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/artist/cremain',
    icon: 'spotify',
  },
  {
    name: 'Bandcamp',
    url: 'https://cremain.bandcamp.com',
    icon: 'bandcamp',
  },
  {
    name: 'Apple Music',
    url: 'https://music.apple.com/us/artist/cremain',
    icon: 'apple',
  },
  {
    name: 'YouTube Music',
    url: 'https://youtube.com/@cremainband',
    icon: 'youtube',
  },
  {
    name: 'SoundCloud',
    url: 'https://soundcloud.com/cremain',
    icon: 'soundcloud',
  },
] as const;

// ============================================
// EPK (Electronic Press Kit)
// ============================================
export const EPK_ASSETS = {
  onePagePDF: {
    name: 'One-page EPK (PDF)',
    url: '/epk/Cremain-EPK-2026.pdf',
    size: '2.4 MB',
  },
  pressPhotos: {
    name: 'Press Photos (ZIP)',
    url: '/epk/Cremain-Press-Photos.zip',
    size: '45.2 MB',
  },
  stagePlot: {
    name: 'Stage Plot & Tech Rider (PDF)',
    url: '/epk/Cremain-Stage-Plot.pdf',
    size: '1.1 MB',
  },
} as const;

// ============================================
// SITE CONFIGURATION
// ============================================
export const SITE_CONFIG = {
  name: 'Cremain',
  fullName: 'Cremain — Official Site',
  tagline: 'Textures of loss and light.',
  genre: 'Post-Rock & Progressive Rock',
  location: 'Dhaka, Bangladesh',
  formed: '2022',
  email: 'booking@cremainband.com',
  socials: {
    instagram: 'https://instagram.com/cremainband',
    twitter: 'https://twitter.com/cremainband',
    youtube: 'https://youtube.com/@cremainband',
  },
} as const;

// ============================================
// CONTACT INFORMATION
// ============================================
export const CONTACT_INFO = {
  email: 'booking@cremainband.com',
  pressEmail: 'press@cremainband.com',
  managementEmail: 'management@cremainband.com',
  phone: '+880 1XXX-XXXXXX',
  location: 'Dhaka, Bangladesh',
} as const;

// ============================================
// EVENTS (TBA - placeholders for when dates are announced)
// ============================================
export const UPCOMING_EVENTS = [
  {
    id: 1,
    date: 'TBA',
    venue: 'Dear Melancholia Album Launch',
    address: 'Dhaka, Bangladesh',
    ticketLink: '#',
  },
] as const;

// ============================================
// BIO SECTIONS
// ============================================
export const BIO = {
  heroTitle: 'Cremain',
  heroSubtitle: 'Post-Rock & Progressive Rock from Dhaka',

  // Main bio text from the markdown
  main: `Emerging from the vibrant, bustling backdrop of Dhaka, Bangladesh, a new collective named Cremain is beginning to command attention. Formed in 2022, the band arrives at a time when the global independent scene is hungry for authenticity, offering a sound that tackles the weight of grief with a sophisticated, elegiac grace. They represent a bridge between the chaotic energy of one of the world's most densely populated cities and the expansive, "pin-drop minimalism" of the post-rock tradition.`,

  origins: `Formed in 2022, Cremain emerged from Dhaka's underground rock scene as a six-piece collective. By blending the patient structures of post-rock with the intricate, odd-metered demands of progressive music, the band is proving that the most resonant emotional explorations often emerge from the most unexpected geographic origins. Their music represents a new standard for atmospheric intensity from South Asia.`,

  influence: `Cremain distinguishes itself from the standard post-rock template by integrating the complexity of progressive rock. While they master the expansive crescendos associated with Explosions in the Sky, they also incorporate the "progressive precision" and "odd meters" one might expect from Karnivool. This duality ensures that their music is as intellectually rewarding as it is emotionally evocative. For fans of Alcest, Russian Circles, and Explosions in the Sky.`,

  sound: `At the core of Cremain's identity is a philosophical commitment to tracing the "fault lines between grief and grace." Their music does not merely dwell in the dark; instead, it uses melancholic textures as a foundation for something transformative. The band's compositions are built on "tectonic drums" that ground the soaring, "widescreen" guitar work. By avoiding the stagnation of standard "slow-burn" formulas, Cremain creates a soundscape that feels constantly in motion. "Cremain sculpt grief into light."`,
} as const;
