import { ExecArgs } from '@medusajs/framework/types';
import { Modules } from '@medusajs/framework/utils';

export default async function seedStore({ container }: ExecArgs) {
  const logger = container.resolve('logger');
  const productModule = container.resolve(Modules.PRODUCT);
  const regionModule = container.resolve(Modules.REGION);
  const salesChannelModule = container.resolve(Modules.SALES_CHANNEL);

  logger.info('Seeding store data...');

  // Create default region
  const [usd] = await regionModule.createRegions([
    {
      name: 'United States',
      currency_code: 'usd',
      countries: ['us', 'ca'],
    },
  ]);

  logger.info(`Created region: ${usd.name}`);

  // Create default sales channel
  const [channel] = await salesChannelModule.createSalesChannels([
    { name: 'Default Sales Channel', description: 'Main storefront channel' },
  ]);

  logger.info(`Created sales channel: ${channel.name}`);

  // Seed product categories
  const categories = [
    { name: 'Apparel', handle: 'apparel', description: 'Clothing and fashion items' },
    { name: 'Accessories', handle: 'accessories', description: 'Bags, jewellery, and more' },
    { name: 'Home & Living', handle: 'home-living', description: 'Décor and kitchen goods' },
    { name: 'Electronics', handle: 'electronics', description: 'Gadgets and tech accessories' },
  ];

  const createdCategories = await productModule.createProductCategories(categories);
  logger.info(`Created ${createdCategories.length} categories`);

  // Seed sample products
  const products = [
    {
      title: 'Merino Wool Sweater',
      handle: 'merino-wool-sweater',
      description: 'Ultra-soft 100% merino wool sweater. Naturally temperature-regulating and odour-resistant.',
      status: 'published' as const,
      thumbnail: 'https://picsum.photos/seed/sw1/600/600',
      options: [{ title: 'Size', values: ['XS', 'S', 'M', 'L', 'XL'] }, { title: 'Color', values: ['Navy', 'Cream', 'Forest Green'] }],
      variants: [
        { title: 'S / Navy', prices: [{ currency_code: 'usd', amount: 12000 }], inventory_quantity: 20 },
        { title: 'M / Navy', prices: [{ currency_code: 'usd', amount: 12000 }], inventory_quantity: 25 },
        { title: 'L / Cream', prices: [{ currency_code: 'usd', amount: 12000 }], inventory_quantity: 15 },
      ],
    },
    {
      title: 'Leather Tote Bag',
      handle: 'leather-tote-bag',
      description: 'Full-grain leather tote bag with internal pockets. Handcrafted in Italy.',
      status: 'published' as const,
      thumbnail: 'https://picsum.photos/seed/bg2/600/600',
      options: [{ title: 'Color', values: ['Black', 'Tan', 'Burgundy'] }],
      variants: [
        { title: 'Black', prices: [{ currency_code: 'usd', amount: 18500 }], inventory_quantity: 12 },
        { title: 'Tan', prices: [{ currency_code: 'usd', amount: 18500 }], inventory_quantity: 8 },
      ],
    },
    {
      title: 'Running Sneakers Pro',
      handle: 'running-sneakers-pro',
      description: 'Lightweight carbon-plate running shoe with responsive foam midsole.',
      status: 'published' as const,
      thumbnail: 'https://picsum.photos/seed/sn3/600/600',
      options: [{ title: 'Size', values: ['7', '8', '9', '10', '11', '12'] }, { title: 'Color', values: ['White', 'Black'] }],
      variants: [
        { title: '9 / White', prices: [{ currency_code: 'usd', amount: 15999 }], inventory_quantity: 18 },
        { title: '10 / White', prices: [{ currency_code: 'usd', amount: 15999 }], inventory_quantity: 22 },
        { title: '10 / Black', prices: [{ currency_code: 'usd', amount: 15999 }], inventory_quantity: 15 },
      ],
    },
    {
      title: 'Silk Neck Scarf',
      handle: 'silk-neck-scarf',
      description: 'Hand-rolled 100% mulberry silk scarf. Inspired by classic Parisian fashion.',
      status: 'published' as const,
      thumbnail: 'https://picsum.photos/seed/sc4/600/600',
      options: [{ title: 'Print', values: ['Floral', 'Abstract', 'Geometric'] }],
      variants: [
        { title: 'Floral', prices: [{ currency_code: 'usd', amount: 6900 }], inventory_quantity: 30 },
        { title: 'Abstract', prices: [{ currency_code: 'usd', amount: 6900 }], inventory_quantity: 25 },
      ],
    },
    {
      title: 'Ceramic Pour-Over Set',
      handle: 'ceramic-pour-over-set',
      description: 'Hand-thrown ceramic pour-over coffee dripper with matching mug. Food-safe glaze.',
      status: 'published' as const,
      thumbnail: 'https://picsum.photos/seed/mug5/600/600',
      options: [{ title: 'Finish', values: ['Matte White', 'Speckled Grey'] }],
      variants: [
        { title: 'Matte White', prices: [{ currency_code: 'usd', amount: 5400 }], inventory_quantity: 40 },
        { title: 'Speckled Grey', prices: [{ currency_code: 'usd', amount: 5400 }], inventory_quantity: 35 },
      ],
    },
    {
      title: 'Linen Wide-Leg Trousers',
      handle: 'linen-wide-leg-trousers',
      description: 'Relaxed linen trousers with an elastic waistband. Breathable for warm weather.',
      status: 'published' as const,
      thumbnail: 'https://picsum.photos/seed/tr6/600/600',
      options: [{ title: 'Size', values: ['XS', 'S', 'M', 'L', 'XL'] }, { title: 'Color', values: ['Sand', 'Ecru', 'Slate'] }],
      variants: [
        { title: 'M / Sand', prices: [{ currency_code: 'usd', amount: 8900 }], inventory_quantity: 20 },
        { title: 'L / Ecru', prices: [{ currency_code: 'usd', amount: 8900 }], inventory_quantity: 18 },
      ],
    },
    {
      title: 'Waxed Canvas Backpack',
      handle: 'waxed-canvas-backpack',
      description: 'Water-resistant waxed canvas backpack with leather accents. 28L capacity.',
      status: 'published' as const,
      thumbnail: 'https://picsum.photos/seed/bp7/600/600',
      options: [{ title: 'Color', values: ['Olive', 'Navy', 'Tan'] }],
      variants: [
        { title: 'Olive', prices: [{ currency_code: 'usd', amount: 21900 }], inventory_quantity: 10 },
        { title: 'Navy', prices: [{ currency_code: 'usd', amount: 21900 }], inventory_quantity: 8 },
      ],
    },
    {
      title: '18K Gold Hoop Earrings',
      handle: 'gold-hoop-earrings',
      description: 'Timeless 18K gold vermeil hoop earrings. Hypoallergenic posts.',
      status: 'published' as const,
      thumbnail: 'https://picsum.photos/seed/er8/600/600',
      options: [{ title: 'Size', values: ['Small (15mm)', 'Medium (25mm)', 'Large (40mm)'] }],
      variants: [
        { title: 'Small (15mm)', prices: [{ currency_code: 'usd', amount: 9800 }], inventory_quantity: 50 },
        { title: 'Medium (25mm)', prices: [{ currency_code: 'usd', amount: 13500 }], inventory_quantity: 30 },
      ],
    },
  ];

  for (const product of products) {
    await productModule.createProducts(product as any);
  }

  logger.info(`Seeded ${products.length} products`);
  logger.info('Store seed complete!');
}
