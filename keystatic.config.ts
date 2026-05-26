import { collection, config, fields } from '@keystatic/core';

const repo = 'alqaddaaree/fatawalib';

export default config({
  storage: {
    kind: 'github',
    repo,
  },
  collections: {
    fatwas: collection({
      label: 'Fatwas',
      path: 'src/content/fatwas/[slug].md',
      slugField: 'id',
      format: { data: 'yaml', contentField: undefined },
      schema: {
        id: fields.slug({
          name: { label: 'Fatwa ID' },
          label: 'Fatwa ID',
          description: 'Used as the filename and URL slug (for example: 006).',
        }),
        title: fields.text({
          label: 'Title',
          description: 'A short descriptive title for the fatwa.',
          required: true,
        }),
        scholar: fields.select({
          label: 'Scholar',
          options: [
            { value: 'ibn-baz', label: 'Shaykh Ibn Baz' },
            { value: 'ibn-uthaymin', label: 'Shaykh Ibn Uthaymin' },
            { value: 'al-albani', label: 'Shaykh al-Albani' },
            { value: 'muqbil', label: 'Shaykh Muqbil al-Wadii' },
            { value: 'yahya', label: 'Shaykh Yahya al-Hajuri' },
          ],
          defaultValue: 'ibn-baz',
        }),
        categories: fields.array(fields.text({ label: 'Category' }), {
          label: 'Categories',
          itemLabel: props => props.value || 'Category',
          required: true,
        }),
        question: fields.text({
          label: 'Question',
          description: 'The question being asked in this fatwa.',
          required: true,
          multiline: true,
        }),
        answer: fields.text({
          label: 'Answer',
          description: 'The translated answer for the fatwa.',
          required: true,
          multiline: true,
        }),
        arabic_question: fields.text({
          label: 'Arabic Question',
          defaultValue: '',
          multiline: true,
        }),
        arabic_answer: fields.text({
          label: 'Arabic Answer',
          defaultValue: '',
          multiline: true,
        }),
        source_url: fields.url({ label: 'Source URL' }),
        translator: fields.text({ label: 'Translator' }),
        reviewer: fields.text({
          label: 'Reviewer (optional)',
          defaultValue: '',
        }),
        date_issued: fields.text({
          label: 'Date Issued (Hijri or ISO)',
          description: 'Example: 1415-03-10 or 1995-08-12',
        }),
        date_issued_gregorian: fields.text({
          label: 'Date Issued (Gregorian)',
          description: 'Example: 1994-09-01',
        }),
        date_added: fields.date({ label: 'Date Added', required: true }),
        audience: fields.select({
          label: 'Audience',
          options: [
            { value: 'general', label: 'General' },
            { value: 'advanced', label: 'Advanced' },
          ],
          defaultValue: 'general',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: props => props.value || 'Tag',
        }),
      },
    }),
  },
});
