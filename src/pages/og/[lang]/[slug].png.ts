import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { generateOgImageForPost } from "@/utils/generateOgImages";

// Helper function to extract slug consistently
function extractSlug(post: any) {
  return post.data.slug ?? post.id.split("/").slice(-1)[0];
}

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map(post => {
    const slug = extractSlug(post);
    const lang = post.data.lang ?? "en";
    return { params: { lang, slug } };
  });
}

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as "en" | "zh-tw";
  const slug = params.slug as string;
  const posts = await getCollection("blog");

  // Use the same slug extraction logic as getStaticPaths
  const post = posts.find(p => {
    const postLang = p.data.lang ?? "en";
    const postSlug = extractSlug(p);
    return postLang === lang && postSlug === slug;
  });

  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  const png = await generateOgImageForPost(post);
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};