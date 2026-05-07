import type { Product } from '@ecommerce/types';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: product.images.map((img) => img.url),
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/products/${product.slug}`,
      priceCurrency: product.currency,
      price: product.price,
      priceValidUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability:
        product.inventoryQuantity > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Your Store' },
    },
    aggregateRating: undefined,
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Your Store',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'support@yourstore.com',
    },
    sameAs: ['https://twitter.com/yourstore', 'https://instagram.com/yourstore'],
  };
}

export function generateBreadcrumbSchema(
  crumbs: Array<{ name: string; url: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${BASE_URL}${crumb.url}`,
    })),
  };
}
