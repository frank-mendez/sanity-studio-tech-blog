import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'
import {DoorsOpenInput} from './components/DoorsOpenInput'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {title: 'Details', name: 'details'},
    {title: 'Editorial', name: 'editorial'},
  ],
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      group: ['details', 'editorial'],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required().error('Required to generate a URL'),
      hidden: ({document}) => !document?.name,
      group: 'details',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      group: 'details',
    },
    {
      name: 'eventType',
      title: 'Description',
      type: 'string',
      options: {
        list: ['in-person', 'virtual', 'hybrid'],
        layout: 'radio'
      },
      group: 'details',
    },
    {
      name: 'doorsOpen',
      description: 'Number of minutes before the event starts',
      title: 'Doors Open',
      type: 'number',
      initialValue: 120,
      group: 'details',
      components: {
        input: DoorsOpenInput
      }
    },
    {
      name: 'venue',
      title: 'Venue',
      type: 'reference',
      to: [{type: 'venue'}],
      readOnly: ({document}) => document?.eventType === 'virtual',
      validation: (rule) => rule.custom((value, context) => {
        if(value && context?.document?.eventType === 'virtual') {
          return 'Virtual events do not have a venue'
        }
        return true
      }),
      group: 'details',
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'reference',
      to: [{type: 'artist'}],
      group: 'details',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'editorial',
    },
    {
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{type: 'block'}],
      group: 'editorial',
    },
    {
      name: 'tickets',
      title: 'Tickets',
      type: 'url',
      group: 'editorial',
    }
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
        : 'No date'

      return {
        title: artist ? `${nameFormatted} (${artist})` : nameFormatted,
        subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
        media: image || CalendarIcon,
      }
    },
  },
})