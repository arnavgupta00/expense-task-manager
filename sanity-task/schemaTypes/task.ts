import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'taskPost',
  title: 'Task',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'userEmail',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'TaskDate',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'TaskCompletedQ',
      title: 'Task Completed Q',
      type: 'boolean',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
