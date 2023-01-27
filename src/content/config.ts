import { defineCollection } from "astro:content";
import { blogSchema } from "./_schemas";

const blogCollection = defineCollection({
  schema: blogSchema,
});

export const collections = {
  blog: blogCollection,
};
