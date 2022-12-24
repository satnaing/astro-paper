import type { APIRoute, MarkdownInstance } from "astro";
import generateOgImage from "@utils/generateOgImage";
import type { Frontmatter } from "@types";

export const get: APIRoute = async ({ params }) => {
  return {
    body: await generateOgImage(params.ogTitle),
  };
};

const postImportResult = import.meta.glob<MarkdownInstance<Frontmatter>>(
  "../contents/**/**/*.md",
  {
    eager: true,
  }
);
const posts = Object.values(postImportResult);

export function getStaticPaths() {
  return posts.map(post => ({
    params: { ogTitle: post.frontmatter.title },
  }));
}
