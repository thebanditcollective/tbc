import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      location: z.string(),
      year: z.number().int(),
      shortDescription: z.string(),
      coverImages: z.array(image()).min(1),
      heroImages: z.array(image()).min(1),
      storyImages: z.array(image()).min(1),
      nextProjectSlug: z.string(),
      sortOrder: z.number().int(),
      featured: z.boolean().default(false),
      featuredLabel: z.string().optional(),
      diptychs: z
        .array(
          z.object({
            left: image(),
            right: image()
          })
        )
        .optional()
    })
});

export const collections = { projects };
