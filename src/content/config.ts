import { defineCollection, z } from 'astro:content';

const scholarsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id:         z.string(),
    name:       z.string(),
    arabicName: z.string(),
    lifespan:   z.string(),
    bio:        z.string(),
  }),
});

const fatwasCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id:                    z.string(),
    title:                 z.string(),
    scholar:               z.string(),
    categories:            z.array(z.string()),
    question:              z.string(),
    answer:                z.string(),
    arabic_question:       z.string().optional(),
    arabic_answer:         z.string().optional(),
    source_url:            z.string().url().optional(),
    translator:            z.string().optional(),
    reviewer:              z.string().optional(),
    date_issued:           z.string().optional(),
    date_issued_gregorian: z.string().optional(),
    date_added:            z.coerce.date(),
    audience:              z.enum(['general','advanced']).default('general'),
    tags:                  z.array(z.string()).optional(),
    footnotes:             z.string().optional(),
    notes:                 z.string().optional(),
  }),
});

export const collections = {
  scholars: scholarsCollection,
  fatwas: fatwasCollection,
};
