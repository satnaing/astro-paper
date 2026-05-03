import { getRelativeLocaleUrl } from "astro:i18n";
import { BLOG_PATH } from "@/content.config";
import { pathWithBase } from "./withBase";
import { slugifyStr } from "./slugify";

function getPostPathSegments(filePath: string | undefined): string[] {
  return (
    filePath
      ?.replace(BLOG_PATH, "")
      .split("/")
      .filter(path => path !== "")
      .filter(path => !path.startsWith("_"))
      .slice(0, -1)
      .map(segment => slugifyStr(segment)) ?? []
  );
}

function getPostSlug(id: string): string {
  const postId = id.split("/");
  return postId.length > 0 ? String(postId[postId.length - 1]) : id;
}

function getPostSlugPath(id: string, filePath: string | undefined): string {
  const pathSegments = getPostPathSegments(filePath);
  const slug = getPostSlug(id);
  return pathSegments.length > 0
    ? [...pathSegments, slug].join("/")
    : String(slug);
}

/**
 * Build a URL path for a post entry.
 *
 * This utility has two modes:
 *
 * 1) Route-param mode (`includeBase = false`)
 *    - Returns a slug-only path (e.g. `/examples/my-post`)
 *    - Used for dynamic route params in `getStaticPaths`
 *    - Does not include Astro `base` and does not localize
 *
 * 2) Render-href mode (`includeBase = true`, default)
 *    - Returns a fully navigable URL for links in templates/components
 *    - If `locale` is provided, uses `getRelativeLocaleUrl()` to apply both
 *      locale routing rules and base path.
 *    - If `locale` is not provided, prefixes with Astro `base` using
 *      `pathWithBase()`.
 *
 * @param id Content entry id from Astro content collection.
 * @param filePath Source markdown file path (used to preserve nested folders).
 * @param includeBase Whether to return a renderable URL or slug-only route param.
 * @param locale Optional locale used for i18n-aware route generation.
 * @returns Post path suitable for either route params or rendered links.
 */
export function getPath(
  id: string,
  filePath: string | undefined,
  includeBase = true,
  locale?: string
) {
  const postSlugPath = getPostSlugPath(id, filePath);

  if (!includeBase) {
    // Route-param mode: keep path free of base/locale prefixes.
    return `/${postSlugPath}`;
  }

  // Render-href mode: emit a final navigable URL.
  return locale !== undefined
    ? getRelativeLocaleUrl(locale, `posts/${postSlugPath}`)
    : pathWithBase(`posts/${postSlugPath}`);
}
