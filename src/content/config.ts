import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const lunch = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      title: z.string(),
      price: z.number(),
      image: image().optional(),
      draft: z.boolean(),
      description: z.string().optional(),
    }),
});

export const collections = { lunch };
