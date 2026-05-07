import { defineField, defineType } from 'sanity';

export const productEnrichment = defineType({
  name: 'productEnrichment',
  title: 'Product Enrichment',
  type: 'document',
  fields: [
    defineField({
      name: 'medusaProductId',
      title: 'Medusa Product ID',
      type: 'string',
      description: 'The ID from Medusa commerce engine (prod_xxxxx)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'For CMS reference only',
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet-point features shown on the product page',
    }),
    defineField({
      name: 'additionalImages',
      title: 'Additional Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'sizeGuide',
      title: 'Size Guide',
      type: 'table',
    }),
    defineField({
      name: 'materials',
      title: 'Materials & Care',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Overrides',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 3 }),
        defineField({ name: 'image', title: 'OG Image', type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'badge',
      title: 'Badge Label',
      type: 'string',
      description: 'E.g. "New", "Best Seller", "Editor\'s Pick"',
    }),
    defineField({
      name: 'story',
      title: 'Brand Story / Product Story',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'medusaProductId' },
  },
});
