import { Resvg } from "@resvg/resvg-js";
import type { CollectionEntry } from "astro:content";
import { postOgTemplate } from "./templates/post.template";
import { siteOgTemplate } from "./templates/site.template";

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"posts">) {
  const svg = await postOgTemplate(post);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await siteOgTemplate();
  return svgBufferToPngBuffer(svg);
}
