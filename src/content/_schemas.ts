import { z } from "astro:content";

export const blogSchema = z.object({
  author: z.string(),
  pubDatetime: z.date(), // z.string().datetime() only available in Zod v3.20.2
  title: z.string(),
  postSlug: z.string().optional(),
  featured: z.boolean(),
  draft: z.boolean(),
  tags: z.array(z.string()),
  ogImage: z
    .object({
      src: z.string(),
      alt: z.string().optional(),
    })
    .optional(),
  description: z.string(),
});

export type BlogFrontmatter = z.infer<typeof blogSchema>;
