import { defineCollection, z } from 'astro:content';

const scholars = ['ibn-baz', 'ibn-uthaymin', 'al-albani', 'muqbil', 'yahya'] as const;

const fatwasCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id:          z.string(),
    scholar:     z.enum(scholars),
    categories:  z.array(z.string()),
    source_url:  z.string().url(),
    translator:  z.string(),
    reviewer:    z.string().optional(),
    date_issued: z.string(), // e.g. "1420-05-12" (Hijri) or ISO date
    date_added:  z.coerce.date(),
  }),
});

export const collections = {
  fatwas: fatwasCollection,
};
