import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import * as bcrypt from 'bcryptjs';

async function seed() {
  await AppDataSource.initialize();
  console.log('Database connected. Running seed...');

  const categoryRepo = AppDataSource.getRepository(Category);
  const userRepo = AppDataSource.getRepository(User);
  const productRepo = AppDataSource.getRepository(Product);

  // Seed categories
  const categories = await categoryRepo.save([
    { name: 'Apparel', slug: 'apparel', description: 'Clothing and fashion' },
    { name: 'Accessories', slug: 'accessories', description: 'Bags, jewelry, and more' },
    { name: 'Home & Living', slug: 'home', description: 'Decor and household items' },
    { name: 'Electronics', slug: 'electronics', description: 'Gadgets and tech' },
  ]);
  console.log(`Seeded ${categories.length} categories`);

  // Seed admin user
  const existingAdmin = await userRepo.findOne({ where: { email: 'admin@yourstore.com' } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('Admin@12345', 10);
    await userRepo.save({
      email: 'admin@yourstore.com',
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      emailVerified: true,
    });
    console.log('Seeded admin user: admin@yourstore.com / Admin@12345');
  }

  // Seed sample products
  const sampleProducts = Array.from({ length: 12 }, (_, i) => ({
    sku: `SKU-${String(i + 1).padStart(4, '0')}`,
    name: `Sample Product ${i + 1}`,
    slug: `sample-product-${i + 1}`,
    description: 'A high-quality sample product for demonstration purposes.',
    shortDescription: 'Premium quality, great value.',
    price: (19.99 + i * 10) * 100,
    compareAtPrice: i % 3 === 0 ? (29.99 + i * 10) * 100 : null,
    currency: 'USD',
    status: 'published' as const,
    inventoryQuantity: 50,
    images: [{ id: `img-${i}`, url: `https://picsum.photos/seed/${i}/800/800`, altText: `Product ${i + 1}`, position: 0 }],
    variants: [{ id: `var-${i}`, sku: `SKU-${i + 1}-DEFAULT`, title: 'Default', price: (19.99 + i * 10) * 100, inventoryQuantity: 50, options: {} }],
    tags: ['sample', i % 2 === 0 ? 'featured' : 'new'],
    categories: [categories[i % categories.length]!],
  }));

  const existing = await productRepo.count();
  if (existing === 0) {
    await productRepo.save(sampleProducts);
    console.log(`Seeded ${sampleProducts.length} products`);
  }

  await AppDataSource.destroy();
  console.log('Seed complete!');
}

seed().catch((err) => { console.error(err); process.exit(1); });
