import { defineType, defineField } from 'sanity';

export const profileType = defineType({
  name: 'profile',
  title: 'Designer Profile & Bio',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      initialValue: 'ELENA VANCE',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      initialValue: 'Principal Visual & Spatial Designer',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Zurich & Paris',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
    }),
    defineField({
      name: 'manifesto',
      title: 'Design Manifesto / Quote',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
  ],
});
