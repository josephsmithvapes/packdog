// PACKDOG — Product catalog
// CJ product IDs: fill in after importing products to your CJDropshipping account
// Find product IDs in CJ dashboard → Product → Details → "CJdropshipping Product ID"

export const PRODUCTS = [
  {
    id: 'hammock-001',
    name: 'Dog Car Hammock Seat Cover',
    slug: 'dog-car-hammock',
    price: 5800,           // cents — $58.00
    supplierCost: 1200,    // cents — $12.00
  cjProductId: "CJJJCWGY00736",
    description: 'Waterproof, scratch-resistant hammock cover for rear seats. Universal fit for SUVs and sedans. Keeps your car fur-free and your dog secure.',
    features: ['Universal rear seat fit', 'Waterproof & scratch-resistant', 'Non-slip backing', 'Easy install — under 2 minutes', 'Machine washable'],
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
    weight: '0.8kg',
    shipsFrom: 'CJ US Warehouse',
    deliveryDays: '5-8',
    stock: 99,
    category: 'car',
  },
  {
    id: 'harness-001',
    name: 'No-Pull Dog Harness',
    slug: 'no-pull-harness',
    price: 4200,           // $42.00
    supplierCost: 800,     // $8.00
  cjProductId: "CJYD225294606FU",
    description: 'Breathable mesh harness with front and back leash clips. Eliminates neck strain from pulling. Perfect for trail walks and city streets alike.',
    features: ['Dual leash attachment (front + back)', 'Breathable air-mesh padding', 'Reflective safety strips', 'Adjustable 4-point fit', 'Sizes XS–XL'],
    image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&q=80',
    weight: '0.3kg',
    shipsFrom: 'CJ US Warehouse',
    deliveryDays: '5-8',
    stock: 99,
    category: 'outdoor',
    variants: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'shade-001',
    name: 'Magnetic Car Window Sun Shade',
    slug: 'magnetic-car-shade',
    price: 3800,           // $38.00
    supplierCost: 500,     // $5.00
  cjProductId: "CJYL231700901AZ",
    description: 'Installs in 10 seconds with no tools. Keeps rear windows cool and protects paws from hot glass. Folds flat when not in use.',
    features: ['10-second magnetic install', 'Works on any window', 'UV-blocking mesh', 'Folds to pocket size', '2-pack included'],
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80',
    weight: '0.2kg',
    shipsFrom: 'CJ US Warehouse',
    deliveryDays: '5-8',
    stock: 99,
    category: 'car',
  },
  {
    id: 'bottle-001',
    name: 'Portable Dog Travel Water Bottle',
    slug: 'dog-water-bottle',
    price: 3200,           // $32.00
    supplierCost: 600,     // $6.00
  cjProductId: "CJJT172014209IR",
    description: 'One-handed squeeze-to-fill bowl. BPA-free, leak-proof, clips to any pack or bag. Essential for trail dogs and city walkers.',
    features: ['350ml capacity', 'One-squeeze fill mechanism', 'BPA-free Tritan plastic', 'Carabiner clip included', 'Dishwasher safe'],
    image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&q=80',
    weight: '0.3kg',
    shipsFrom: 'CJ US Warehouse',
    deliveryDays: '5-8',
    stock: 99,
    category: 'outdoor',
  },
  {
    id: 'collar-001',
    name: 'LED Safety Collar (USB Rechargeable)',
    slug: 'led-safety-collar',
    price: 3400,           // $34.00
    supplierCost: 700,     // $7.00
  cjProductId: "CJGX205310612LO",
    description: 'USB-C rechargeable LED collar. 3 light modes — steady, slow flash, fast flash. Visible up to 500m. Perfect for dawn and dusk walks.',
    features: ['USB-C fast charge (1hr full)', '3 glow modes', 'Visible up to 500m', 'IPX6 waterproof', 'Sizes S / M / L'],
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80',
    weight: '0.15kg',
    shipsFrom: 'CJ US Warehouse',
    deliveryDays: '5-8',
    stock: 99,
    category: 'safety',
    variants: ['S', 'M', 'L'],
  },
]

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null
}

export function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug) || null
}
