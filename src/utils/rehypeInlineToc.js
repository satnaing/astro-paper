import { readFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildTocTree } from "./buildTocTree";

const TOC_HEADING = /^(table[ -]of[ -])?contents?$|^toc$/i;
const HEADING_TAG = /^h([1-6])$/;

const textOf = node =>
  node.type === "text"
    ? node.value
    : (node.children ?? []).map(textOf).join("");

const list = items => ({
  type: "element",
  tagName: "ul",
  properties: {},
  children: items.map(item => ({
    type: "element",
    tagName: "li",
    properties: {},
    children: [
      {
        type: "element",
        tagName: "a",
        properties: { href: `#${item.slug}` },
        children: [{ type: "text", value: item.text }],
      },
      ...(item.children.length ? [list(item.children)] : []),
    ],
  })),
});

/**
 * Deprecated: posts get a layout TOC (`features.toc`); support for an
 * author-written TOC heading ends in v8.
 *
 * Rehype plugin that replaces remark-toc + remark-collapse. The heading an
 * author writes ("## Table of contents", same match as remark-toc) becomes a
 * collapsed `details.toc-inline` listing the headings after it. The heading
 * itself is removed, so it isn't in the page outline or in `headings`.
 *
 * Needs heading ids: put it after Astro's `rehypeHeadingIds`. unified runs a
 * plugin only once, so that call is also where Astro collects `headings`;
 * the removed heading is dropped from that list here.
 */
export const rehypeInlineToc =
  ({ maxDepth = 6 } = {}) =>
  (tree, file) => {
    let target;
    const headings = [];

    const walk = parent => {
      parent.children?.forEach((node, index) => {
        const level =
          node.type === "element" && HEADING_TAG.exec(node.tagName)?.[1];
        if (!level) return walk(node);

        const text = textOf(node).trim();
        if (!target && TOC_HEADING.test(text)) {
          target = { parent, index, text, id: node.properties?.id };
        } else if (target && node.properties?.id) {
          headings.push({
            depth: Number(level),
            slug: node.properties.id,
            text,
          });
        }
      });
    };
    walk(tree);

    if (!target) return;
    const items = buildTocTree(headings, maxDepth);

    const collected = file.data.astro?.headings;
    if (collected) {
      file.data.astro.headings = collected.filter(h => h.slug !== target.id);
    }

    target.parent.children.splice(target.index, 1, {
      type: "element",
      tagName: "details",
      properties: { className: ["toc-inline"], dataPagefindIgnore: true },
      children: [
        {
          type: "element",
          tagName: "summary",
          properties: {},
          children: [{ type: "text", value: target.text }],
        },
        {
          type: "element",
          tagName: "nav",
          properties: { ariaLabel: target.text, dataTocNav: true },
          children: items.length ? [list(items)] : [],
        },
      ],
    });
  };

const POSTS_DIR = "src/content/posts/";
const ATX_HEADING = /^ {0,3}#{1,6}\s+(.*?)(?:\s+#+)?\s*$/;
const FENCE = /^ {0,3}(`{3,}|~{3,})(.*)$/;

const usesTocHeading = source => {
  let fence = "";
  for (const line of source.split("\n")) {
    const [, marks, rest] = FENCE.exec(line) ?? [];
    if (fence) {
      const closes =
        marks?.[0] === fence[0] && marks.length >= fence.length && !rest.trim();
      if (closes) fence = "";
    } else if (marks) {
      fence = marks;
    } else if (TOC_HEADING.test(ATX_HEADING.exec(line)?.[1] ?? "")) {
      return true;
    }
  }
  return false;
};

/**
 * Warns once per `astro dev` or `astro build` when posts still have an
 * author-written TOC heading. It reads the post files directly, so the count
 * doesn't depend on which posts get rendered.
 */
export const inlineTocDeprecation = () => ({
  name: "astro-paper:inline-toc",
  hooks: {
    "astro:config:setup": ({ config, command, isRestart, logger }) => {
      if (isRestart || (command !== "dev" && command !== "build")) return;
      const dir = fileURLToPath(new URL(POSTS_DIR, config.root));
      let files;
      try {
        files = readdirSync(dir, { recursive: true });
      } catch {
        return;
      }
      const posts = files.filter(
        file =>
          /\.mdx?$/.test(file) &&
          !basename(file).startsWith("_") &&
          usesTocHeading(readFileSync(join(dir, file), "utf8"))
      );
      if (!posts.length) return;
      logger.warn(
        `${posts.length} post(s) still have a "## Table of contents" heading (e.g. ${POSTS_DIR}${posts[0]}). ` +
          "It's deprecated and stops working in v8: posts now get a table of contents from the layout (features.toc), so remove the heading."
      );
    },
  },
});
