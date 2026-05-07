import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { SearchResults } from './SearchResults';
import { Skeleton } from '@ecommerce/ui';

export const metadata: Metadata = { title: 'Search' };

export default function SearchPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
