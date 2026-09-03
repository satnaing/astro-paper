import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";

export const BLOG_PATH = "src/content/posts";

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z
      .object({
        author: z.string().default(config.site.author),
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
        /** URL slug shared by every post in the series, e.g. "my-series". */
        series: z.string().optional(),
        /** Display name for the series, e.g. "My Series". */
        seriesTitle: z.string().optional(),
        /** 1-indexed position of this post within the series. */
        seriesOrder: z.number().optional(),
        /**
         * Summary shown on the series' listing page. By convention, set
         * this on the first post only (later posts can omit it) — the
         * series page falls back to a generic description otherwise.
         */
        seriesDescription: z.string().optional(),
        /** Marks the series finished. Set on the final post only. */
        seriesComplete: z.boolean().optional(),
      })
      .refine(
        data =>
          (data.series === undefined) === (data.seriesTitle === undefined) &&
          (data.series === undefined) === (data.seriesOrder === undefined),
        {
          message:
            "series, seriesTitle, and seriesOrder must be set together — a post can't have one without the other two.",
        }
      ),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

export const collections = { posts, pages };
