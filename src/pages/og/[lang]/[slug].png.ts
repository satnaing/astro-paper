import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { generateOgImageForPost } from "@/utils/generateOgImages";

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map(post => {
    const data: any = post.data as any;
    const slug = data.slug ?? post.id.split("/").slice(-1)[0];
    const lang = data.lang ?? "en";
    return { params: { lang, slug } };
  });
}

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as "en" | "zh-TW";
  const slug = params.slug as string;
  const posts = await getCollection("blog");
  const post = posts.find(p => ((p.data as any).lang ?? "en") === lang && (p.data as any).slug === slug);

  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  const png = await generateOgImageForPost(post);
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};