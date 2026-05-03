const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
const baseRoot = base === "" ? "/" : `${base}/`;

function stripLeadingSlash(path: string): string {
  return path.replace(/^\/+/, "");
}

/**
 * Prefix a route-like path with the configured Astro `base`.
 * Always returns a root-relative URL and keeps a trailing slash for root paths.
 */
export function pathWithBase(path: string): string {
  const normalizedPath = stripLeadingSlash(path);
  return normalizedPath ? baseRoot + normalizedPath : baseRoot;
}

/**
 * Prefix an asset/file path with the configured Astro `base`.
 * Does not force a trailing slash for empty paths.
 */
export function fileWithBase(path: string): string {
  const normalizedPath = stripLeadingSlash(path);
  if (!normalizedPath) {
    return base === "" ? "/" : base;
  }
  return baseRoot + normalizedPath;
}

/**
 * Strip the configured Astro `base` prefix from an absolute pathname.
 * Returns a root-relative pathname.
 */
export function stripBase(pathname: string): string {
  if (base === "") {
    return pathname;
  }
  if (pathname === base) {
    return "/";
  }
  if (pathname.startsWith(baseRoot)) {
    const stripped = pathname.slice(base.length);
    return stripped === "" ? "/" : stripped;
  }
  return pathname;
}
