import { createClient, type SanityClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
};

export const sanityClient: SanityClient = createClient(config);

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ── GROQ Queries ──────────────────────────────────────────────────────────────

export async function getHomepage() {
  return sanityClient.fetch(
    `*[_type == "homepage"][0] {
      title,
      hero { heading, subheading, cta, backgroundImage },
      featured { title, products[]->{ _id, title, slug, mainImage, price } },
      seo { title, description, image }
    }`,
    {},
    { next: { revalidate: 60, tags: ['homepage'] } },
  );
}

export async function getPage(slug: string) {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0] {
      title,
      slug,
      content,
      seo { title, description }
    }`,
    { slug },
    { next: { revalidate: 300, tags: [`page:${slug}`] } },
  );
}

export async function getProductEnrichment(medusaProductId: string) {
  return sanityClient.fetch(
    `*[_type == "productEnrichment" && medusaProductId == $id][0] {
      additionalImages,
      longDescription,
      features,
      seo { title, description }
    }`,
    { id: medusaProductId },
    { next: { revalidate: 300, tags: [`product:${medusaProductId}`] } },
  );
}

export async function getBlogPosts(limit = 10) {
  return sanityClient.fetch(
    `*[_type == "blogPost" && !(_id in path('drafts.**'))] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      author->{ name, image }
    }`,
    { limit: limit - 1 },
    { next: { revalidate: 300, tags: ['blog'] } },
  );
}

export async function getSiteSettings() {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0] {
      siteName,
      description,
      logo,
      socialLinks,
      contactEmail,
      address
    }`,
    {},
    { next: { revalidate: 3600, tags: ['settings'] } },
  );
}
