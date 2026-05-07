import { Suspense } from 'react';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { HeroSection } from '@/components/common/HeroSection';
import { FeaturedProducts } from '@/components/product/FeaturedProducts';
import { CategoryGrid } from '@/components/product/CategoryGrid';
import { Newsletter } from '@/components/common/Newsletter';
import { Skeleton } from '@ecommerce/ui';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <FeaturedProducts />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <CategoryGrid />
        </Suspense>
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
