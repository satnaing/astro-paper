/**
 * Get URL with base path for internal links
 * @param path - The path to append to base (e.g., "/about", "/posts")
 * @returns Full path with base included
 */
export function getBaseUrl(path: string = ""): string {
  const base = import.meta.env.BASE_URL || "/";
  
  // Remove leading slash from path if exists
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  // If base is empty or just "/", return the path with leading slash
  if (!base || base === "/") {
    return `/${cleanPath}`;
  }
  
  // Remove trailing slash from base if exists
  const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
  
  // Combine base and path
  return `${cleanBase}/${cleanPath}`;
}
