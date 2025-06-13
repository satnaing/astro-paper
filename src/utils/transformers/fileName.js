export const transformerFileName = () => ({
  pre(node) {
    const raw = this.options.meta?.__raw?.split(" ");

    if (!raw) return;

    const metaMap = new Map();

    for (const item of raw) {
      const [key, value] = item.split("=");
      metaMap.set(key, value.replace(/["'`]/g, ""));
    }

    const file = metaMap.get("file");

    if (!file) return;

    node.children.push({
      type: "element",
      tagName: "span",
      properties: {
        class: [
          "px-2 py-1",
          "absolute left-0 -top-6",
          "rounded-t-md border border-b-0",
          "bg-muted/50 text-foreground text-xs font-medium leading-4",
        ],
      },
      children: [
        {
          type: "text",
          value: file,
        },
      ],
    });

    this.addClassToHast(node, "mt-12 rounded-tl-none");
  },
});
