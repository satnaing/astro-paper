export type TocItem = {
  depth: number;
  slug: string;
  text: string;
  children: TocItem[];
};

type Heading = { depth: number; slug: string; text: string };

/**
 * Nests a flat heading list (h2 at the top). A skipped level (h2 → h4) nests
 * under the closest shallower heading, and a post that starts at h3 puts it
 * at the top level, so no heading order can break the build.
 */
export function buildTocTree(headings: Heading[], maxDepth = 3): TocItem[] {
  const root: TocItem[] = [];
  const stack: TocItem[] = [];

  for (const { depth, slug, text } of headings) {
    if (depth < 2 || depth > maxDepth) continue;
    const item: TocItem = { depth, slug, text, children: [] };
    while (stack.length && stack[stack.length - 1].depth >= depth) stack.pop();
    (stack[stack.length - 1]?.children ?? root).push(item);
    stack.push(item);
  }

  return root;
}

/** A TOC is worth showing from 2 headings in its depth range. */
export function hasToc(headings: Heading[], maxDepth = 3) {
  return headings.filter(h => h.depth >= 2 && h.depth <= maxDepth).length >= 2;
}
