import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const socialSchema = z.object({
  name: z.string(),
  href: z.string(),
  linkTitle: z.string(),
});

const socials = defineCollection({
  loader: file(`./src/components/constants/_social.json`),
  schema: socialSchema,
});

const shareLinks = defineCollection({
  loader: file(`./src/components/constants/_share.json`),
  schema: socialSchema,
});

export const collections = { blog, socials, shareLinks };
