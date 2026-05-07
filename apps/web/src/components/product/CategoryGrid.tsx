import Link from 'next/link';

const categories = [
  { name: 'Apparel', slug: 'c1', emoji: '👕', description: 'Sweaters, trousers & more' },
  { name: 'Accessories', slug: 'c2', emoji: '👜', description: 'Bags, scarves & jewellery' },
  { name: 'Home & Living', slug: 'c3', emoji: '🏡', description: 'Décor, kitchen & lighting' },
  { name: 'Electronics', slug: 'c4', emoji: '🎧', description: 'Audio, gadgets & tech' },
];

export function CategoryGrid() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold">Shop by Category</h2>
        <Link href="/products" className="text-sm text-primary hover:underline hidden sm:block">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products?category=${cat.slug}`}
            className="flex flex-col items-center justify-center gap-2 md:gap-3 p-5 md:p-8 rounded-xl border bg-card hover:border-primary hover:bg-accent/50 transition-all text-center group"
          >
            <span className="text-3xl md:text-4xl">{cat.emoji}</span>
            <div>
              <p className="font-medium text-sm md:text-base group-hover:text-primary transition-colors">
                {cat.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 hidden md:block">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
