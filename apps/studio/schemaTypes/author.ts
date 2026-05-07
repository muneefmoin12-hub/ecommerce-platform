import { defineField, defineType } from 'sanity';

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 3 }),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'social', title: 'Social Handle', type: 'string' }),
  ],
  preview: {
    select: { title: 'name', media: 'image', subtitle: 'role' },
  },
});
