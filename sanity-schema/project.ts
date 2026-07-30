import { defineType, defineField } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Tagline',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Spatial',
          'Editorial',
          'Typography',
          'Branding',
          'Digital',
          'Product',
        ],
      },
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio (e.g., 3/4, 16/9, 1/1, 21/9)',
      type: 'string',
      initialValue: '4/3',
    }),
    defineField({
      name: 'aspectRatioLabel',
      title: 'Aspect Ratio Label (e.g., 3:4 Portrait, 16:9 Landscape)',
      type: 'string',
      initialValue: '4:3 Landscape',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Portfolio Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'secondaryImages',
      title: 'Secondary Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'text',
    }),
    defineField({
      name: 'client',
      title: 'Client / Commissioner',
      type: 'string',
    }),
    defineField({
      name: 'tools',
      title: 'Tools & Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
