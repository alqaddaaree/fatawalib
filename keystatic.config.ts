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
        id: fields.slug({
          name: { label: 'Scholar ID' },
          slug: {
            generate: (formValues: any) => {
              const name = formValues?.name ?? '';
              return name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
            },
          },
        }),
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
        id: fields.slug({
  name: { label: 'Fatwa ID' },
  slug: {
    generate: (formValues: any) => {
      console.log('formValues', formValues);   // <-- look in browser console
      const title = formValues?.title ?? '';
      if (!title) return '';

      let scholarId = '';
      const rawScholar = formValues?.scholar;
      if (typeof rawScholar === 'string') {
        scholarId = rawScholar;
      } else if (rawScholar && typeof rawScholar === 'object' && rawScholar.id) {
        scholarId = rawScholar.id;
      }

      const titleSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return scholarId ? `${scholarId}-${titleSlug}` : titleSlug;
    },
  },
}),
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
        question: fields.markdoc({
          label: 'Question',
          description: 'The question being asked in this fatwa.',
        }),
        answer: fields.markdoc({
          label: 'Answer',
          description: 'The translated answer for the fatwa.',
        }),
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
        footnotes: fields.markdoc({
          label: 'Footnotes',
          description: 'Additional footnotes or references.',
        }),
        notes: fields.markdoc({
          label: 'Notes',
          description: 'Any additional notes about the fatwa.',
        }),
      },
    }),
  },
});