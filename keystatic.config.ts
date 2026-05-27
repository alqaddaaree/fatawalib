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
      format: { data: 'yaml', contentField: 'content' },
      schema: {
        id: fields.slug({
          name: { label: 'Scholar ID' },
        }),
        name: fields.text({
          label: 'Name',
          validation: { length: { min: 1 } },
        }),
        arabicName: fields.text({
          label: 'Arabic Name',
          validation: { length: { min: 1 } },
        }),
        lifespan: fields.text({
          label: 'Lifespan',
          validation: { length: { min: 1 } },
        }),
        bio: fields.text({
          label: 'Biography',
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        content: fields.text({
          label: 'Content',
          defaultValue: '',
          multiline: true,
        }),
      },
    }),
    fatwas: collection({
      label: 'Fatwas',
      path: 'src/content/fatwas/*',
      slugField: 'id',
      format: { data: 'yaml', contentField: 'content' },
      schema: {
        id: fields.slug({
          name: { label: 'Fatwa ID' },
        }),
        title: fields.text({
          label: 'Title',
          validation: { length: { min: 1 } },
        }),
        scholar: fields.relationship({
          label: 'Scholar',
          collection: 'scholars',
        }),
        categories: fields.array(
          fields.text({ label: 'Category' }),
          {
            label: 'Categories',
            itemLabel: (props: any) => props.value || 'Category',
            validation: { length: { min: 1 } },
          }
        ),
        question: fields.text({
          label: 'Question',
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        answer: fields.text({
          label: 'Answer',
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        content: fields.text({
          label: 'Content',
          defaultValue: '',
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
        date_added: fields.date({
          label: 'Date Added',
          validation: { isRequired: true },
        }),
        audience: fields.select({
          label: 'Audience',
          options: [
            { value: 'general', label: 'General' },
            { value: 'advanced', label: 'Advanced' },
          ],
          defaultValue: 'general',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props: any) => props.value || 'Tag',
          }
        ),
        footnotes: fields.text({
          label: 'Footnotes',
          defaultValue: '',
          multiline: true,
        }),
        notes: fields.text({
          label: 'Notes',
          defaultValue: '',
          multiline: true,
        }),
      },
    }),
  },
});