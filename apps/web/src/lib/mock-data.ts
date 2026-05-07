import type { Product, Order } from '@ecommerce/types';

const now = new Date().toISOString();

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', medusaId: null, sku: 'SKU-001', name: 'Merino Wool Sweater', slug: 'merino-wool-sweater', description: 'Ultra-soft 100% merino wool sweater. Naturally temperature-regulating and odour-resistant. Crafted in small batches by artisan knitters.', shortDescription: 'Artisan-knitted 100% merino wool', price: 12000, compareAtPrice: 16000, currency: 'USD', images: [{ id: 'i1', url: 'https://picsum.photos/seed/sw1/600/600', altText: 'Merino Wool Sweater', position: 0 }], variants: [{ id: 'v1a', sku: 'SKU-001-S', title: 'S / Navy', price: 12000, compareAtPrice: 16000, inventoryQuantity: 20, options: { Size: 'S', Color: 'Navy' }, images: [], weight: undefined, weightUnit: undefined }, { id: 'v1b', sku: 'SKU-001-M', title: 'M / Cream', price: 12000, compareAtPrice: 16000, inventoryQuantity: 15, options: { Size: 'M', Color: 'Cream' }, images: [], weight: undefined, weightUnit: undefined }], categories: [{ id: 'c1', name: 'Apparel', slug: 'apparel' }], tags: ['new', 'wool'], status: 'published', inventoryQuantity: 35, metadata: {}, createdAt: now, updatedAt: now },

  { id: 'p2', medusaId: null, sku: 'SKU-002', name: 'Leather Tote Bag', slug: 'leather-tote-bag', description: 'Full-grain leather tote bag with internal pockets, zip closure, and detachable pouch. Handcrafted in Italy by fourth-generation artisans.', shortDescription: 'Full-grain Italian leather tote', price: 18500, compareAtPrice: undefined, currency: 'USD', images: [{ id: 'i2', url: 'https://picsum.photos/seed/bg2/600/600', altText: 'Leather Tote Bag', position: 0 }], variants: [{ id: 'v2a', sku: 'SKU-002-BK', title: 'Black', price: 18500, compareAtPrice: undefined, inventoryQuantity: 12, options: { Color: 'Black' }, images: [], weight: undefined, weightUnit: undefined }, { id: 'v2b', sku: 'SKU-002-TN', title: 'Tan', price: 18500, compareAtPrice: undefined, inventoryQuantity: 8, options: { Color: 'Tan' }, images: [], weight: undefined, weightUnit: undefined }], categories: [{ id: 'c2', name: 'Accessories', slug: 'accessories' }], tags: ['bestseller'], status: 'published', inventoryQuantity: 20, metadata: {}, createdAt: now, updatedAt: now },

  { id: 'p3', medusaId: null, sku: 'SKU-003', name: 'Running Sneakers Pro', slug: 'running-sneakers-pro', description: 'Lightweight carbon-plate running shoe with responsive foam midsole. Breathable engineered-mesh upper. Suitable for road and light trail.', shortDescription: 'Carbon-plate performance runner', price: 15999, compareAtPrice: 19999, currency: 'USD', images: [{ id: 'i3', url: 'https://picsum.photos/seed/sn3/600/600', altText: 'Running Sneakers', position: 0 }], variants: [{ id: 'v3a', sku: 'SKU-003-9W', title: '9 / White', price: 15999, compareAtPrice: 19999, inventoryQuantity: 18, options: { Size: '9', Color: 'White' }, images: [], weight: undefined, weightUnit: undefined }], categories: [{ id: 'c1', name: 'Apparel', slug: 'apparel' }], tags: ['new', 'running'], status: 'published', inventoryQuantity: 18, metadata: {}, createdAt: now, updatedAt: now },

  { id: 'p4', medusaId: null, sku: 'SKU-004', name: 'Silk Neck Scarf', slug: 'silk-neck-scarf', description: 'Hand-rolled 100% mulberry silk scarf with a vibrant floral print. Inspired by classic Parisian fashion. 90×90 cm.', shortDescription: 'Hand-rolled mulberry silk, 90×90cm', price: 6900, compareAtPrice: undefined, currency: 'USD', images: [{ id: 'i4', url: 'https://picsum.photos/seed/sc4/600/600', altText: 'Silk Scarf', position: 0 }], variants: [{ id: 'v4a', sku: 'SKU-004-FL', title: 'Floral', price: 6900, compareAtPrice: undefined, inventoryQuantity: 30, options: { Print: 'Floral' }, images: [], weight: undefined, weightUnit: undefined }], categories: [{ id: 'c2', name: 'Accessories', slug: 'accessories' }], tags: ['silk', 'gift'], status: 'published', inventoryQuantity: 30, metadata: {}, createdAt: now, updatedAt: now },

  { id: 'p5', medusaId: null, sku: 'SKU-005', name: 'Ceramic Pour-Over Set', slug: 'ceramic-pour-over-set', description: 'Hand-thrown ceramic pour-over dripper with matching 350ml mug. Food-safe reactive glaze. Each piece is unique. Pairs with any V60 paper filter.', shortDescription: 'Hand-thrown ceramic coffee set', price: 5400, compareAtPrice: undefined, currency: 'USD', images: [{ id: 'i5', url: 'https://picsum.photos/seed/mug5/600/600', altText: 'Ceramic Set', position: 0 }], variants: [{ id: 'v5a', sku: 'SKU-005-MW', title: 'Matte White', price: 5400, compareAtPrice: undefined, inventoryQuantity: 40, options: { Finish: 'Matte White' }, images: [], weight: undefined, weightUnit: undefined }], categories: [{ id: 'c3', name: 'Home & Living', slug: 'home-living' }], tags: ['ceramic', 'gift', 'home'], status: 'published', inventoryQuantity: 40, metadata: {}, createdAt: now, updatedAt: now },

  { id: 'p6', medusaId: null, sku: 'SKU-006', name: 'Linen Wide-Leg Trousers', slug: 'linen-wide-leg-trousers', description: 'Relaxed wide-leg linen trousers with an elastic smock waistband and side pockets. Breathable for warm weather. Sustainably sourced Belgian linen.', shortDescription: 'Relaxed Belgian linen, elastic waist', price: 8900, compareAtPrice: 11900, currency: 'USD', images: [{ id: 'i6', url: 'https://picsum.photos/seed/tr6/600/600', altText: 'Linen Trousers', position: 0 }], variants: [{ id: 'v6a', sku: 'SKU-006-MS', title: 'M / Sand', price: 8900, compareAtPrice: 11900, inventoryQuantity: 20, options: { Size: 'M', Color: 'Sand' }, images: [], weight: undefined, weightUnit: undefined }], categories: [{ id: 'c1', name: 'Apparel', slug: 'apparel' }], tags: ['linen', 'summer'], status: 'published', inventoryQuantity: 20, metadata: {}, createdAt: now, updatedAt: now },

  { id: 'p7', medusaId: null, sku: 'SKU-007', name: 'Waxed Canvas Backpack', slug: 'waxed-canvas-backpack', description: '28L water-resistant waxed canvas backpack with padded laptop sleeve (fits 15"), leather accents, and antique brass hardware. Rolled-top closure.', shortDescription: '28L waxed canvas, fits 15" laptop', price: 21900, compareAtPrice: undefined, currency: 'USD', images: [{ id: 'i7', url: 'https://picsum.photos/seed/bp7/600/600', altText: 'Waxed Canvas Backpack', position: 0 }], variants: [{ id: 'v7a', sku: 'SKU-007-OL', title: 'Olive', price: 21900, compareAtPrice: undefined, inventoryQuantity: 10, options: { Color: 'Olive' }, images: [], weight: undefined, weightUnit: undefined }], categories: [{ id: 'c2', name: 'Accessories', slug: 'accessories' }], tags: ['bestseller', 'canvas'], status: 'published', inventoryQuantity: 10, metadata: {}, createdAt: now, updatedAt: now },

  { id: 'p8', medusaId: null, sku: 'SKU-008', name: '18K Gold Hoop Earrings', slug: 'gold-hoop-earrings', description: 'Timeless 18K gold vermeil hoop earrings with hypoallergenic sterling silver posts. Available in three diameters. Nickel-free. Comes in a signature gift box.', shortDescription: '18K gold vermeil, hypoallergenic', price: 9800, compareAtPrice: undefined, currency: 'USD', images: [{ id: 'i8', url: 'https://picsum.photos/seed/er8/600/600', altText: 'Gold Earrings', position: 0 }], variants: [{ id: 'v8a', sku: 'SKU-008-SM', title: 'Small (15mm)', price: 9800, compareAtPrice: undefined, inventoryQuantity: 50, options: { Size: 'Small (15mm)' }, images: [], weight: undefined, weightUnit: undefined }, { id: 'v8b', sku: 'SKU-008-MD', title: 'Medium (25mm)', price: 13500, compareAtPrice: undefined, inventoryQuantity: 30, options: { Size: 'Medium (25mm)' }, images: [], weight: undefined, weightUnit: undefined }], categories: [{ id: 'c2', name: 'Accessories', slug: 'accessories' }], tags: ['gold', 'gift'], status: 'published', inventoryQuantity: 80, metadata: {}, createdAt: now, updatedAt: now },

  { id: 'p9', medusaId: null, sku: 'SKU-009', name: 'Rattan Pendant Light', slug: 'rattan-pendant-light', description: 'Handwoven natural rattan pendant light shade with a 1.5m braided cord and E27 socket. Creates warm, dappled light patterns. Suits boho and Japandi interiors.', shortDescription: 'Handwoven rattan, E27 socket', price: 7800, compareAtPrice: undefined, currency: 'USD', images: [{ id: 'i9', url: 'https://picsum.photos/seed/lt9/600/600', altText: 'Rattan Light', position: 0 }], variants: [{ id: 'v9a', sku: 'SKU-009-NAT', title: 'Natural', price: 7800, compareAtPrice: undefined, inventoryQuantity: 22, options: { Finish: 'Natural' }, images: [], weight: undefined, weightUnit: undefined }], categories: [{ id: 'c3', name: 'Home & Living', slug: 'home-living' }], tags: ['home', 'lighting'], status: 'published', inventoryQuantity: 22, metadata: {}, createdAt: now, updatedAt: now },

  { id: 'p10', medusaId: null, sku: 'SKU-010', name: 'Wireless Noise-Cancelling Headphones', slug: 'wireless-noise-cancelling-headphones', description: 'Over-ear ANC headphones with 40-hour battery, multipoint Bluetooth 5.3, and foldable design. Includes a hard-shell travel case. Premium drivers tuned by audiophiles.', shortDescription: '40hr ANC, Bluetooth 5.3', price: 28900, compareAtPrice: 34900, currency: 'USD', images: [{ id: 'i10', url: 'https://picsum.photos/seed/hp10/600/600', altText: 'Headphones', position: 0 }], variants: [{ id: 'v10a', sku: 'SKU-010-BK', title: 'Midnight Black', price: 28900, compareAtPrice: 34900, inventoryQuantity: 15, options: { Color: 'Midnight Black' }, images: [], weight: undefined, weightUnit: undefined }], categories: [{ id: 'c4', name: 'Electronics', slug: 'electronics' }], tags: ['new', 'tech', 'audio'], status: 'published', inventoryQuantity: 15, metadata: {}, createdAt: now, updatedAt: now },

  { id: 'p11', medusaId: null, sku: 'SKU-011', name: 'Bamboo Cutting Board Set', slug: 'bamboo-cutting-board-set', description: 'Set of 3 organic bamboo cutting boards in graduated sizes. Juice groove on large board. Naturally antimicrobial and knife-friendly. FSC-certified bamboo.', shortDescription: 'FSC-certified bamboo, set of 3', price: 4200, compareAtPrice: undefined, currency: 'USD', images: [{ id: 'i11', url: 'https://picsum.photos/seed/cb11/600/600', altText: 'Bamboo Boards', position: 0 }], variants: [{ id: 'v11a', sku: 'SKU-011-SET', title: 'Set of 3', price: 4200, compareAtPrice: undefined, inventoryQuantity: 35, options: {}, images: [], weight: undefined, weightUnit: undefined }], categories: [{ id: 'c3', name: 'Home & Living', slug: 'home-living' }], tags: ['eco', 'kitchen', 'gift'], status: 'published', inventoryQuantity: 35, metadata: {}, createdAt: now, updatedAt: now },

  { id: 'p12', medusaId: null, sku: 'SKU-012', name: 'Cashmere Beanie', slug: 'cashmere-beanie', description: 'Pure Grade A cashmere beanie with a ribbed cuff and slouchy crown. Sourced from Inner Mongolia. Comes in a reusable cotton bag. One size fits most.', shortDescription: 'Grade A cashmere, one-size slouchy', price: 7500, compareAtPrice: undefined, currency: 'USD', images: [{ id: 'i12', url: 'https://picsum.photos/seed/bn12/600/600', altText: 'Cashmere Beanie', position: 0 }], variants: [{ id: 'v12a', sku: 'SKU-012-IV', title: 'Ivory', price: 7500, compareAtPrice: undefined, inventoryQuantity: 25, options: { Color: 'Ivory' }, images: [], weight: undefined, weightUnit: undefined }], categories: [{ id: 'c1', name: 'Apparel', slug: 'apparel' }], tags: ['cashmere', 'winter', 'gift'], status: 'published', inventoryQuantity: 25, metadata: {}, createdAt: now, updatedAt: now },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-001',
    orderNumber: 'ORD-2025-001',
    userId: 'user-1',
    medusaCartId: null,
    status: 'delivered',
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    items: [
      { id: 'oi1', orderId: 'ord-001', productId: 'p1', variantId: 'v1a', medusaLineItemId: null, title: 'Merino Wool Sweater', variantTitle: 'S / Navy', quantity: 1, unitPrice: 12000, totalPrice: 12000, thumbnail: 'https://picsum.photos/seed/sw1/100/100', metadata: {} },
      { id: 'oi2', orderId: 'ord-001', productId: 'p4', variantId: 'v4a', medusaLineItemId: null, title: 'Silk Neck Scarf', variantTitle: 'Floral', quantity: 2, unitPrice: 6900, totalPrice: 13800, thumbnail: 'https://picsum.photos/seed/sc4/100/100', metadata: {} },
    ],
    shippingAddress: { id: 'addr-1', firstName: 'Alex', lastName: 'Johnson', address1: '142 W 72nd St', address2: 'Apt 4B', city: 'New York', state: 'NY', postalCode: '10023', country: 'US', phone: '+1 212 555 0192' },
    billingAddress: { id: 'addr-1', firstName: 'Alex', lastName: 'Johnson', address1: '142 W 72nd St', address2: 'Apt 4B', city: 'New York', state: 'NY', postalCode: '10023', country: 'US', phone: '+1 212 555 0192' },
    subtotal: 25800,
    discountTotal: 0,
    shippingTotal: 0,
    taxTotal: 2580,
    total: 28380,
    currency: 'USD',
    metadata: {},
    createdAt: '2025-04-12T10:22:00Z',
    updatedAt: '2025-04-15T14:05:00Z',
  },
  {
    id: 'ord-002',
    orderNumber: 'ORD-2025-002',
    userId: 'user-1',
    medusaCartId: null,
    status: 'processing',
    paymentStatus: 'paid',
    fulfillmentStatus: 'not_fulfilled',
    items: [
      { id: 'oi3', orderId: 'ord-002', productId: 'p10', variantId: 'v10a', medusaLineItemId: null, title: 'Wireless Noise-Cancelling Headphones', variantTitle: 'Midnight Black', quantity: 1, unitPrice: 28900, totalPrice: 28900, thumbnail: 'https://picsum.photos/seed/hp10/100/100', metadata: {} },
    ],
    shippingAddress: { id: 'addr-1', firstName: 'Alex', lastName: 'Johnson', address1: '142 W 72nd St', address2: 'Apt 4B', city: 'New York', state: 'NY', postalCode: '10023', country: 'US', phone: '+1 212 555 0192' },
    billingAddress: { id: 'addr-1', firstName: 'Alex', lastName: 'Johnson', address1: '142 W 72nd St', address2: 'Apt 4B', city: 'New York', state: 'NY', postalCode: '10023', country: 'US', phone: '+1 212 555 0192' },
    subtotal: 28900,
    discountTotal: 0,
    shippingTotal: 999,
    taxTotal: 2890,
    total: 32789,
    currency: 'USD',
    metadata: {},
    createdAt: '2025-05-01T08:45:00Z',
    updatedAt: '2025-05-01T09:12:00Z',
  },
  {
    id: 'ord-003',
    orderNumber: 'ORD-2025-003',
    userId: 'user-1',
    medusaCartId: null,
    status: 'pending',
    paymentStatus: 'pending',
    fulfillmentStatus: 'not_fulfilled',
    items: [
      { id: 'oi4', orderId: 'ord-003', productId: 'p2', variantId: 'v2a', medusaLineItemId: null, title: 'Leather Tote Bag', variantTitle: 'Black', quantity: 1, unitPrice: 18500, totalPrice: 18500, thumbnail: 'https://picsum.photos/seed/bg2/100/100', metadata: {} },
    ],
    shippingAddress: { id: 'addr-1', firstName: 'Alex', lastName: 'Johnson', address1: '142 W 72nd St', address2: 'Apt 4B', city: 'New York', state: 'NY', postalCode: '10023', country: 'US', phone: '+1 212 555 0192' },
    billingAddress: { id: 'addr-1', firstName: 'Alex', lastName: 'Johnson', address1: '142 W 72nd St', address2: 'Apt 4B', city: 'New York', state: 'NY', postalCode: '10023', country: 'US', phone: '+1 212 555 0192' },
    subtotal: 18500,
    discountTotal: 0,
    shippingTotal: 0,
    taxTotal: 1850,
    total: 20350,
    currency: 'USD',
    metadata: {},
    createdAt: '2025-05-06T16:30:00Z',
    updatedAt: '2025-05-06T16:30:00Z',
  },
];

export const MOCK_CATEGORIES = [
  { id: 'c1', name: 'Apparel', slug: 'apparel', emoji: '👗', count: 4 },
  { id: 'c2', name: 'Accessories', slug: 'accessories', emoji: '👜', count: 4 },
  { id: 'c3', name: 'Home & Living', slug: 'home-living', emoji: '🏡', count: 3 },
  { id: 'c4', name: 'Electronics', slug: 'electronics', emoji: '🎧', count: 1 },
];
