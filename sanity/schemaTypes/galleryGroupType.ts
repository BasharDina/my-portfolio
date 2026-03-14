import {defineField, defineType} from 'sanity'

export const galleryGroupType = defineType({
  name: 'galleryGroup',
  title: 'Gallery Group',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Client / Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
    },
    prepare({title, media}) {
      return {
        title,
        subtitle: 'Gallery group',
        media,
      }
    },
  },
})