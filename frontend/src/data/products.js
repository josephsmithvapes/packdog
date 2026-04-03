export const PRODUCTS = [
  {
    id: 'hammock-001',
    name: 'Dog Car Hammock Seat Cover',
    slug: 'dog-car-hammock',
    price: 58,
    originalPrice: null,
    description: 'Waterproof, scratch-resistant hammock cover for rear seats. Universal fit for SUVs and sedans. Keeps your car fur-free and your dog secure.',
    tagline: 'No more fur on your back seat.',
    features: ['Universal rear seat fit', 'Waterproof & scratch-resistant', 'Non-slip backing', 'Easy install — under 2 minutes', 'Machine washable'],
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
    category: 'car',
    badge: 'Best Seller',
    deliveryDays: '5-8',
  },
  {
    id: 'harness-001',
    name: 'No-Pull Dog Harness',
    slug: 'no-pull-harness',
    price: 42,
    originalPrice: null,
    description: 'Breathable mesh harness with front and back leash clips. Eliminates neck strain from pulling. Perfect for trail walks and city streets.',
    tagline: 'Stop the pull. Start the adventure.',
    features: ['Dual leash attachment (front + back)', 'Breathable air-mesh padding', 'Reflective safety strips', 'Adjustable 4-point fit', 'Sizes XS–XL'],
    image: 'https://cf.cjdropshipping.com/quick/product/208f43fb-2b95-4776-a15d-2056a852c833.jpg?x-oss-process=image/resize,m_fill,w_375',
    category: 'outdoor',
    badge: 'Top Rated',
    deliveryDays: '5-8',
    variants: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'shade-001',
    name: 'Magnetic Car Window Shade',
    slug: 'magnetic-car-shade',
    price: 38,
    originalPrice: null,
    description: 'Installs in 10 seconds with no tools. Keeps rear windows cool and protects paws from hot glass. Folds flat when not in use.',
    tagline: 'Cool paws, happy dog.',
    features: ['10-second magnetic install', 'Works on any window', 'UV-blocking mesh', 'Folds to pocket size', '2-pack included'],
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
    category: 'car',
    badge: 'New',
    deliveryDays: '5-8',
  },
  {
    id: 'bottle-001',
    name: 'Portable Dog Water Bottle',
    slug: 'dog-water-bottle',
    price: 32,
    originalPrice: null,
    description: 'One-handed squeeze-to-fill bowl. BPA-free, leak-proof, clips to any pack or bag. Essential for trail dogs and city walkers.',
    tagline: 'Hydrate the adventure.',
    features: ['350ml capacity', 'One-squeeze fill mechanism', 'BPA-free Tritan plastic', 'Carabiner clip included', 'Dishwasher safe'],
    image: 'https://cc-west-usa.cjdropshipping.com/0b2ab61c-a09f-4c10-8e47-dc45cb56b3b4_trans.jpeg?x-oss-process=image/resize,m_fill,w_375',
    category: 'outdoor',
    badge: null,
    deliveryDays: '5-8',
  },
  {
    id: 'collar-001',
    name: 'LED Safety Collar',
    slug: 'led-safety-collar',
    price: 34,
    originalPrice: null,
    description: 'USB-C rechargeable LED collar with 3 light modes. Visible up to 500m. IPX6 waterproof for all-weather walks.',
    tagline: 'Be seen. Stay safe.',
    features: ['USB-C fast charge (1hr full)', '3 glow modes', 'Visible up to 500m', 'IPX6 waterproof', 'Sizes S / M / L'],
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
    category: 'safety',
    badge: null,
    deliveryDays: '5-8',
    variants: ['S', 'M', 'L'],
  },
]

export const BUNDLES = [
  {
    id: 'bundle-road-trip',
    name: 'Road Trip Bundle',
    items: ['hammock-001', 'shade-001', 'bottle-001'],
    price: 108,
    savings: 20,
    tagline: 'Everything your dog needs for the journey.',
  },
]

export function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug) || null
}

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null
}
