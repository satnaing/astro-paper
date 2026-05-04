import { existsSync } from "node:fs";
import path from "node:path";
import type { ResolvedAstroPaperConfig } from "@/types/config";
import { getAssetPath } from "./withBase";

/**
 * Default `og:image` path for layouts when no explicit prop is passed.
 *
 * - If `dynamicOgImage` is on: use `/{site.ogImage}` when that file exists under
 *   `public/`, otherwise fall back to generated `/og.png`.
 * - If `dynamicOgImage` is off: require `public/{site.ogImage}` and throw at
 *   build/dev time if it is missing (no generated fallback).
 */
export function resolveDefaultOgImagePath(
  config: ResolvedAstroPaperConfig
): string {
  const filename = config.site.ogImage;
  if (
    filename.includes("..") ||
    filename.includes("/") ||
    filename.includes("\\")
  ) {
    throw new Error(
      `site.ogImage must be a single filename in public/ (e.g. "default-og.jpg"), got "${filename}"`
    );
  }

  const publicFile = path.join(process.cwd(), "public", filename);
  const exists = existsSync(publicFile);

  if (config.features.dynamicOgImage) {
    if (exists) {
      return getAssetPath(filename);
    }
    return getAssetPath("og.png");
  }

  if (!exists) {
    throw new Error(
      `AstroPaper: missing public/${filename}. Add that file, or set site.ogImage to an existing file under public/, or enable features.dynamicOgImage to fall back to /og.png.`
    );
  }

  return getAssetPath(filename);
}
