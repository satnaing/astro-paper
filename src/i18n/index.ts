import type { UIStrings } from "./types";

export { tplStr } from "./format";

const modules = import.meta.glob<{ default: UIStrings }>("./lang/*.ts", {
  eager: true,
});

const translations: Record<string, UIStrings> = {};
for (const [path, mod] of Object.entries(modules)) {
  const locale = path.slice("./lang/".length, -".ts".length);
  translations[locale] = mod.default;
}

type ResolvedStrings = { [K in keyof UIStrings]: Required<UIStrings[K]> };

/**
 * Returns UI strings for the given locale, falling back to English. Labels that
 * are optional until v8 fall back one by one.
 */
export function useTranslations(locale: string = "en"): ResolvedStrings {
  const t = translations[locale] ?? translations["en"];
  return {
    ...t,
    post: { tableOfContents: "Table of contents", ...t.post },
    a11y: { skipTableOfContents: "Skip table of contents", ...t.a11y },
  };
}
