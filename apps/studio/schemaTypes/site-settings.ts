import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string' }),
    defineField({ name: 'description', title: 'Site Description', type: 'text', rows: 2 }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'favicon', title: 'Favicon', type: 'image' }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'supportPhone', title: 'Support Phone', type: 'string' }),
    defineField({
      name: 'address',
      title: 'Business Address',
      type: 'object',
      fields: [
        defineField({ name: 'line1', title: 'Address Line 1', type: 'string' }),
        defineField({ name: 'line2', title: 'Address Line 2', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'state', title: 'State / Region', type: 'string' }),
        defineField({ name: 'postalCode', title: 'Postal Code', type: 'string' }),
        defineField({ name: 'country', title: 'Country', type: 'string' }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
        defineField({ name: 'twitter', title: 'X / Twitter URL', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok URL', type: 'url' }),
        defineField({ name: 'pinterest', title: 'Pinterest URL', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'navigation',
      title: 'Main Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
            defineField({
              name: 'children',
              title: 'Dropdown Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', title: 'Label', type: 'string' }),
                    defineField({ name: 'href', title: 'Link', type: 'string' }),
                  ],
                },
              ],
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer Links',
      type: 'object',
      fields: [
        defineField({
          name: 'columns',
          title: 'Link Columns',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'heading', title: 'Column Heading', type: 'string' }),
                defineField({
                  name: 'links',
                  title: 'Links',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        defineField({ name: 'label', title: 'Label', type: 'string' }),
                        defineField({ name: 'href', title: 'Link', type: 'string' }),
                      ],
                    },
                  ],
                }),
              ],
              preview: { select: { title: 'heading' } },
            },
          ],
        }),
        defineField({ name: 'copyright', title: 'Copyright Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Default Meta Title', type: 'string' }),
        defineField({ name: 'description', title: 'Default Meta Description', type: 'text', rows: 3 }),
        defineField({ name: 'image', title: 'Default OG Image', type: 'image', options: { hotspot: true } }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
});
