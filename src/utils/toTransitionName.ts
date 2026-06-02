import { slugifyStr } from "./slugify";

/**
 * Produce a valid CSS <custom-ident> for view-transition-name.
 * CSS idents only allow [a-zA-Z0-9_-] plus Unicode U+00A0+.
 * Non-ASCII chars are hex-encoded, ASCII special chars (:, /, etc.)
 * are replaced with hyphens to keep the browser from ignoring the name.
 */
export const toTransitionName = (str: string): string => {
  const base = slugifyStr(str.replaceAll(".", "-"));
  let result = base
    // encode non-ASCII chars (Chinese, Japanese, etc.)
    .replace(
      /[^\x00-\x7F]/gu,
      c => "u" + c.codePointAt(0)!.toString(16).padStart(6, "0")
    )
    // replace any remaining invalid chars (colons, slashes, etc.)
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    // collapse consecutive hyphens and trim
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  // CSS ident must not start with a digit
  if (/^\d/.test(result)) result = "p-" + result;
  if (!result) result = "post";
  return result;
};
