import {defineField, defineType} from 'sanity'

export const path = defineType({
  name: 'path',
  type: 'string',
  validation: (Rule) =>
    Rule.required().custom((value: string | undefined, context) => {
      if (!value) return true
      if (!value.startsWith('/')) return 'Must start with "/"'
      return true
    }),
})

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'experimentString',
    }),
    defineField({
      name: 'path',
      title: 'Path',
      type: 'experimentPath',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'experimentImage',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'experimentImage',
      validation: (Rule) =>
        Rule.custom((value: any) => {
          if (!value.default) return 'Must have a default image'
          if (value.active && (!value.variants || value.variants?.length === 0)) {
            return 'Must have at least one variant'
          }
          return true
        }),
    }),
    defineField({
      name: 'featuredArtist',
      title: 'Featured Artist',
      type: 'experimentFeaturedArtist',
    }),
    defineField({
      name: 'array',
      type: 'experimentCustomArray',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title.default ? title.default : undefined,
        subtitle: title.variants
          ? title.variants.map((variant: any) => variant.value).join(' | ')
          : undefined,
        media: media?.default ?? undefined,
      }
    },
  },
})
