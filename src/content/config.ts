import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    author: z.string(),
    datetime: z.string(), // z.string().datetime() only available in Zod v3.20.2
    title: z.string(),
    slug: z.string().optional(),
    featured: z.boolean(),
    draft: z.boolean(),
    tags: z.array(z.string()),
    ogImage: z.string().optional(),
    description: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
};
