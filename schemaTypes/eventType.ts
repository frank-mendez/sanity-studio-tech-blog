import {defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

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
      name: 'title',
      title: 'Title',
      type: 'string',
      group: ['details', 'editorial'],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required().error('Required to generate a URL'),
      hidden: ({document}) => !document?.title,
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
      title: 'title',
      venue: 'venue.name',
      artist: 'headline.name',
      date: 'date',
      image: 'image'
    },
    prepare({title, venue, artist, date, image}) {
      const titleFormatted = title || 'Untitled event'
      const dateFormatted = date ? new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) : 'No date set';


      return {
        title: artist ? `${titleFormatted} ${artist}` : titleFormatted,
        subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
        media: image || CalendarIcon,
      }
    }
  }
})