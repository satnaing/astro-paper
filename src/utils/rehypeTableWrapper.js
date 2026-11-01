/**
 * Rehype plugin that wraps each table in a focusable, horizontally scrollable
 * `div.table-wrapper`, so wide tables scroll inside the post on small screens
 * instead of widening the page. `tabindex="0"` lets keyboard users scroll it.
 *
 * Tables inside `<ResponsiveTable>` (MDX) are skipped: it has its own wrapper.
 */
export const rehypeTableWrapper = () => tree => {
  const wrap = node => {
    if (!node.children) return;
    if (node.type === "mdxJsxFlowElement" && node.name === "ResponsiveTable")
      return;

    node.children = node.children.map(child => {
      if (child.type === "element" && child.tagName === "table") {
        return {
          type: "element",
          tagName: "div",
          properties: { className: ["table-wrapper"], tabIndex: 0 },
          children: [child],
        };
      }
      wrap(child);
      return child;
    });
  };

  wrap(tree);
};
