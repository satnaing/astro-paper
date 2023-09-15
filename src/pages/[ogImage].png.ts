import generateOgImages from "@utils/generateOgImages";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => new Response(await generateOgImages());

export const getStaticPaths = () => [
  { params: { ogImage: "generating images with " } },
];
