import rss from "@astrojs/rss";
import type { Frontmatter } from "src/types";
import type { MarkdownInstance } from "astro";

const postImportResult = import.meta.glob<MarkdownInstance<Frontmatter>>(
  "../contents/*.md",
  {
    eager: true,
  }
);
const posts = Object.values(postImportResult);

export const get = () =>
  rss({
    title: import.meta.env.PUBLIC_SITE_TITLE,
    description: import.meta.env.PUBLIC_SITE_DESC,
    site: import.meta.env.SITE,
    items: posts.map(({ frontmatter }) => ({
      link: frontmatter.slug,
      title: frontmatter.title,
      description: frontmatter.description,
      pubDate: new Date(frontmatter.datetime),
    })),
  });
