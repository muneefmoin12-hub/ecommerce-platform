import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/product/ProductDetail';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { apiClient } from '@/lib/api-client';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { generateProductSchema } from '@/lib/seo';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product =
    (await apiClient.products.getBySlug(params.slug).catch(() => null)) ??
    MOCK_PRODUCTS.find((p) => p.slug === params.slug) ??
    null;

  if (!product) return {};

  return {
    title: product.name,
    description: product.shortDescription ?? product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.shortDescription ?? product.description.slice(0, 160),
      images: product.images.map((img) => ({ url: img.url, alt: img.altText ?? product.name })),
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product =
    (await apiClient.products.getBySlug(params.slug).catch(() => null)) ??
    MOCK_PRODUCTS.find((p) => p.slug === params.slug) ??
    null;

  if (!product) notFound();

  const jsonLd = generateProductSchema(product);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <ProductDetail product={product} />
        <div className="mt-16 md:mt-20">
          <RelatedProducts categoryId={product.categories[0]?.id} excludeId={product.id} />
        </div>
      </div>
    </>
  );
}
