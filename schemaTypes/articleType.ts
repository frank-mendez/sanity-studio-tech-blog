import {defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {title: 'Details', name: 'details'},
    {title: 'Editorial', name: 'editorial'},
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'details',
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (rule) => rule.required(),
      group: 'details',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      group: 'details',
    },
    {
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      group: 'editorial',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'tags',
      group: 'editorial',
    },
    {
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{type: 'block'}],
      group: 'editorial',
    },
  ],
})
