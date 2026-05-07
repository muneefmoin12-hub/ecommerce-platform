import { defineField, defineType } from 'sanity';

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string' }),

    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2 }),
        defineField({
          name: 'cta',
          title: 'Call to Action',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Button Label', type: 'string' }),
            defineField({ name: 'href', title: 'Link URL', type: 'string' }),
          ],
        }),
        defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
        defineField({
          name: 'badgeText',
          title: 'Badge Text',
          type: 'string',
          description: 'E.g. "New Collection 2025"',
        }),
      ],
    }),

    defineField({
      name: 'announcements',
      title: 'Announcement Bar',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Rotating announcements shown at top of page',
    }),

    defineField({
      name: 'featured',
      title: 'Featured Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string' }),
        defineField({
          name: 'products',
          title: 'Featured Product IDs',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Medusa product IDs to feature on homepage',
        }),
      ],
    }),

    defineField({
      name: 'categories',
      title: 'Featured Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'slug', title: 'Slug', type: 'string' }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'description', title: 'Short Description', type: 'string' }),
          ],
          preview: { select: { title: 'name', media: 'image' } },
        },
      ],
    }),

    defineField({
      name: 'banner',
      title: 'Mid-Page Banner',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
        defineField({ name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } }),
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 3 }),
        defineField({ name: 'image', title: 'OG Image', type: 'image', options: { hotspot: true } }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare() {
      return { title: 'Homepage' };
    },
  },
});
