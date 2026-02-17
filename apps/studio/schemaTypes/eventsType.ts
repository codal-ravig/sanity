import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {DoorsOpenInput} from './components/DoorsOpenInput'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required().error(`Required to generate a page on the website`),
      hidden: ({document}) => !document?.name,
      readOnly: ({value, currentUser}) => {
        // Anyone can set the initial slug
        if (!value) {
          return false
        }
        console.log(currentUser)
        const isAdmin = currentUser?.roles.some((role) => role.name === 'administrator')

        // Only admins can change the slug
        return !isAdmin
      },
    }),
    defineField({
      name: 'newName',
      type: 'experimentString',
      // group: ['editorial', 'details'],
    }),
    defineField({
      hidden: true,
      name: 'eventType',
      type: 'string',
      options: {
        list: ['in-person', 'virtual'],
        layout: 'radio',
      },
      deprecated: {
        reason: 'Use the "Event format" field instead.',
      },
      readOnly: true,
    }),
    defineField({
      name: 'format',
      type: 'string',
      options: {
        list: ['in-person', 'virtual'],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'datetime',
    }),
    defineField({
      name: 'doorsOpen',
      type: 'number',
      description: 'Number of minutes',
      initialValue: 60,
      components: {
        input: DoorsOpenInput,
      },
    }),
    defineField({
      name: 'venue',
      type: 'reference',
      to: [{type: 'venue'}],
      readOnly: ({value, document}) => !value && document?.eventType === 'virtual',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value && context?.document?.eventType === 'virtual') {
            return 'Only in-person events can have a venue'
          }

          return true
        }),
    }),
    defineField({
      name: 'headline',
      type: 'reference',
      to: [{type: 'artist'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'tickets',
      type: 'url',
    }),
    defineField({
      name: 'firstPublished',
      description: 'Automatically set when first published',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      venue: 'venue.name',
      artist: 'headline.name',
      date: 'date',
      image: 'image',
    },
    prepare({name, venue, artist, date, image}) {
      const nameFormatted = name || 'Untitled event'
      const dateFormatted = date
        ? new Date(date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })
        : ''

      return {
        title: artist ? `${nameFormatted} (${artist})` : nameFormatted,
        subtitle: venue ? `${dateFormatted} @ ${venue}` : dateFormatted,
        media: image || CalendarIcon,
      }
    },
  },
})
