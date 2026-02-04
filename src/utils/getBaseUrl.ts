import { base } from 'astro:env/client';

/**
 * Get URL with base path for internal links
 * @param path - The path to append to base (e.g., "/about", "/posts")
 * @returns Full path with base included
 */
export function getBaseUrl(path: string = ""): string {
  // Remove leading slash from path if exists
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  // If base is empty or just "/", return the path with leading slash
  if (!base || base === "/") {
    return `/${cleanPath}`;
  }
  
  // Combine base and path
  return `${base}/${cleanPath}`;
}
