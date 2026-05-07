'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

const CATEGORIES = [
  { id: 'c1', label: 'Apparel', slug: 'apparel' },
  { id: 'c2', label: 'Accessories', slug: 'accessories' },
  { id: 'c3', label: 'Home & Living', slug: 'home-living' },
  { id: 'c4', label: 'Electronics', slug: 'electronics' },
];

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      params.delete('page');
      router.push(`/products?${params.toString()}`);
    },
    [router, searchParams],
  );

  const activeCategory = searchParams.get('category');
  const hasFilters = searchParams.toString() !== '';

  const filterContent = (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Search</h3>
        <input
          type="text"
          placeholder="Search products..."
          defaultValue={searchParams.get('search') ?? ''}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              updateFilter('search', (e.target as HTMLInputElement).value || null);
            }
          }}
          onBlur={(e) => updateFilter('search', e.target.value || null)}
          className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Category */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Category</h3>
        <div className="space-y-1">
          <button
            onClick={() => updateFilter('category', null)}
            className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${!activeCategory ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilter('category', activeCategory === cat.id ? null : cat.id)}
              className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${activeCategory === cat.id ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Sort By</h3>
        <select
          className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
          value={searchParams.get('sortBy') ?? 'createdAt'}
          onChange={(e) => updateFilter('sortBy', e.target.value)}
        >
          <option value="createdAt">Newest First</option>
          <option value="price">Price: Low → High</option>
          <option value="name">Name A → Z</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Price Range (USD)</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            defaultValue={searchParams.get('minPrice') ?? ''}
            onBlur={(e) => updateFilter('minPrice', e.target.value || null)}
          />
          <span className="text-muted-foreground shrink-0">–</span>
          <input
            type="number"
            placeholder="Max"
            className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            defaultValue={searchParams.get('maxPrice') ?? ''}
            onBlur={(e) => updateFilter('maxPrice', e.target.value || null)}
          />
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={() => router.push('/products')}
          className="w-full text-sm text-primary hover:underline text-left"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 text-sm font-medium border rounded-md px-4 py-2 bg-background hover:bg-muted transition-colors"
        >
          <span>Filters {hasFilters ? '•' : ''}</span>
          <svg
            className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="mt-3 p-4 border rounded-lg bg-card">
            {filterContent}
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        {filterContent}
      </div>
    </>
  );
}
