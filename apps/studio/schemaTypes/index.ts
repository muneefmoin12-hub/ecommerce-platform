import { homepage } from './homepage';
import { page } from './page';
import { blogPost } from './blog-post';
import { productEnrichment } from './product-enrichment';
import { siteSettings } from './site-settings';
import { author } from './author';

export const schemaTypes = [
  // Singletons
  homepage,
  siteSettings,
  // Collections
  page,
  blogPost,
  productEnrichment,
  author,
];
