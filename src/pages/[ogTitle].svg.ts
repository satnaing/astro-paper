import type { APIRoute } from "astro";
import generateOgImage from "@utils/generateOgImage";

export const get: APIRoute = async ({ params, request }) => {
  const ogTitle = params.ogTitle ?? "Hello World";
  console.log(ogTitle);
  return {
    body: await generateOgImage(ogTitle),
  };
};

export function getStaticPaths() {
  return [
    { params: { ogTitle: "Post 1" } },
    { params: { ogTitle: "Post 2" } },
    { params: { ogTitle: "Post 3" } },
  ];
}
