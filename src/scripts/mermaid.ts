/**
 * Mermaid diagram initialization script
 * Loads Mermaid from CDN and renders diagrams client-side
 * Only included on posts with `mermaid: true` in frontmatter
 */

const MERMAID_CDN =
  "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

const getTheme = (): string => {
  const theme = document.documentElement.dataset.theme;
  return theme === "dark" ? "dark" : "default";
};

const initMermaid = async () => {
  const blocks = document.querySelectorAll("pre > code.language-mermaid");

  // No mermaid blocks found, skip initialization
  if (blocks.length === 0) return;

  // Dynamically import Mermaid from CDN
  const mermaid = await import(/* @vite-ignore */ MERMAID_CDN);

  mermaid.default.initialize({
    startOnLoad: false,
    theme: getTheme(),
  });

  // Render each mermaid code block
  for (const block of blocks) {
    const pre = block.parentElement;
    if (!pre) continue;

    const code = block.textContent || "";
    const id = `mermaid-${crypto.randomUUID().slice(0, 8)}`;

    try {
      const { svg } = await mermaid.default.render(id, code);
      const wrapper = document.createElement("div");
      wrapper.className = "mermaid-diagram";
      wrapper.innerHTML = svg;
      pre.replaceWith(wrapper);
    } catch {
      // On error, leave the code block as-is for debugging
      pre.classList.add("mermaid-error");
    }
  }
};

// Run on initial page load
initMermaid();

// Re-run on Astro view transitions
document.addEventListener("astro:page-load", initMermaid);
