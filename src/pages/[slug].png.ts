import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { getSlugFromPath } from "@/utils/getPath";
import { generateOgImageForPost } from "@/utils/generateOgImages";

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return posts.map(post => ({
    params: { slug: getSlugFromPath(post.id, post.filePath) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  return new Response(
    await generateOgImageForPost(props as CollectionEntry<"blog">),
    {
      headers: { "Content-Type": "image/png" },
    }
  );
}; 