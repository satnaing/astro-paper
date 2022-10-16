import { SITE } from "src/config";
import rss from "@astrojs/rss";
import type { Frontmatter } from "src/types";
import type { MarkdownInstance } from "astro";
import slugify from "@utils/slugify";

const postImportResult = import.meta.glob<MarkdownInstance<Frontmatter>>(
  "../contents/**/**/*.md",
  {
    eager: true,
  }
);
const posts = Object.values(postImportResult);

export const get = () =>
  rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: posts.map(({ frontmatter }) => ({
      link: slugify(frontmatter),
      title: frontmatter.title,
      description: frontmatter.description,
      pubDate: new Date(frontmatter.datetime),
    })),
  });
