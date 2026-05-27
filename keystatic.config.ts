import { collection, config, fields } from '@keystatic/core';

const repo = 'alqaddaaree/fatawalib';

export default config({
  storage: {
    kind: 'github',
    repo,
  },
  collections: {
    scholars: collection({
      label: 'Scholars',
      path: 'src/content/scholars/*',
      slugField: 'id',
      format: { data: 'yaml' },
      schema: {
        id: fields.slug({ name: { label: 'Scholar ID' } }),
        name: fields.text({ label: 'Name', validation: { isRequired: true } }),
        arabicName: fields.text({ label: 'Arabic Name', validation: { isRequired: true } }),
        lifespan: fields.text({ label: 'Lifespan', validation: { isRequired: true } }),
        bio: fields.text({ label: 'Biography', multiline: true, validation: { isRequired: true } }),
      },
    }),
    fatwas: collection({
      label: 'Fatwas',
      path: 'src/content/fatwas/*',
      slugField: 'id',
      format: { data: 'yaml' },
      schema: {
        id: fields.slug({ name: { label: 'Fatwa ID' } }),
        title: fields.text({ label: 'Title', validation: { isRequired: true } }),
        scholar: fields.relationship({ label: 'Scholar', collection: 'scholars' }),
        categories: fields.array(
          fields.text({ label: 'Category' }),
          {
            label: 'Categories',
            itemLabel: (props: any) => props.value || 'Category',
            validation: { length: { min: 1 } },
          }
        ),
        question: fields.text({ label: 'Question', multiline: true, validation: { isRequired: true } }),
        answer: fields.text({ label: 'Answer', multiline: true, validation: { isRequired: true } }),
        arabic_question: fields.text({ label: 'Arabic Question', defaultValue: '', multiline: true }),
        arabic_answer: fields.text({ label: 'Arabic Answer', defaultValue: '', multiline: true }),
        source_url: fields.url({ label: 'Source URL' }),
        translator: fields.text({ label: 'Translator' }),
        reviewer: fields.text({ label: 'Reviewer (optional)', defaultValue: '' }),
        date_issued: fields.text({ label: 'Date Issued (Hijri or ISO)' }),
        date_issued_gregorian: fields.text({ label: 'Date Issued (Gregorian)' }),
        date_added: fields.date({ label: 'Date Added', validation: { isRequired: true } }),
        audience: fields.select({
          label: 'Audience',
          options: [{ value: 'general', label: 'General' }, { value: 'advanced', label: 'Advanced' }],
          defaultValue: 'general',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: (props: any) => props.value || 'Tag' }),
        footnotes: fields.text({ label: 'Footnotes', defaultValue: '', multiline: true }),
        notes: fields.text({ label: 'Notes', defaultValue: '', multiline: true }),
      },
    }),
  },
});