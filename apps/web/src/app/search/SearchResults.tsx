'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { formatCurrency } from '@ecommerce/utils';

const POPULAR = ['merino wool', 'leather', 'ceramic', 'canvas', 'candle'];

export function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initial = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initial);
  const [submitted, setSubmitted] = useState(initial);

  useEffect(() => {
    setQuery(initial);
    setSubmitted(initial);
  }, [initial]);

  const results = submitted
    ? MOCK_PRODUCTS.filter((p) => {
        const q = submitted.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.categories.some((c) => c.name.toLowerCase().includes(q))
        );
      })
    : [];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setSubmitted(query.trim());
    router.push(`/search?q=${encodeURIComponent(query.trim())}`, { scroll: false });
  }

  return (
    <>
      {/* Search bar */}
      <section className="bg-[#faf7f4] py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center tracking-tight">Search</h1>
          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, categories..."
              autoFocus
              className="w-full h-14 pl-12 pr-24 rounded-2xl border-2 border-border bg-white text-base focus:outline-none focus:border-primary transition-colors shadow-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); setSubmitted(''); router.push('/search'); }}
                className="absolute right-16 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-9 px-4 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Go
            </button>
          </form>

          {!submitted && (
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-3 text-center">Popular searches</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {POPULAR.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      setSubmitted(term);
                      router.push(`/search?q=${encodeURIComponent(term)}`);
                    }}
                    className="px-4 py-1.5 rounded-full text-sm border border-border bg-white hover:border-primary hover:text-primary transition-colors capitalize"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      {submitted && (
        <section className="py-10">
          <div className="container mx-auto px-4 max-w-5xl">
            <p className="text-sm text-muted-foreground mb-6">
              {results.length === 0
                ? `No results for "${submitted}"`
                : `${results.length} result${results.length !== 1 ? 's' : ''} for "${submitted}"`}
            </p>

            {results.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">Try a different term, or browse our full catalogue.</p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Browse all products <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {results.map((product) => (
                  <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-muted mb-3">
                      {product.images[0] && (
                        <Image
                          src={product.images[0].url}
                          alt={product.images[0].altText ?? product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        />
                      )}
                    </div>
                    <h3 className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm font-bold mt-1">{formatCurrency(product.price)}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
