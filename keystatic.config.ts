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
      path: 'src/content/fatwas/*',
      slugField: 'id',
      format: { data: 'yaml', contentField: 'body' },
      schema: {
        id: fields.slug({
          name: { label: 'Fatwa ID' },
          label: 'Fatwa ID',
          description: 'Used as the filename and URL slug (for example: 006).',
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
        date_added: fields.date({ label: 'Date Added' }),
        body: fields.document({
          label: 'Fatwa Content',
          description: 'Use headings like ## Question and ## Answer.',
          formatting: true,
          links: true,
        }),
      },
    }),
  },
});
