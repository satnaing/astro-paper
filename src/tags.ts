/**
 * Tag configuration
 * - slug: the URL-safe identifier (used in posts frontmatter and URLs)
 * - name: display name with proper capitalization/spacing
 * - description: short description shown on the tags page
 */

type TagConfig = {
  slug: string;
  name: string;
  description: string;
};

export const TAGS: TagConfig[] = [
  {
    slug: "dev-notes",
    name: "dev-notes",
    description: "Notes about how to run this website",
  },
  {
    slug: "random",
    name: "random",
    description: "Random thoughts and musings",
  },
];

/**
 * Get tag config by slug
 * Returns default values if tag is not configured
 */
export function getTagConfig(slug: string): TagConfig {
  const config = TAGS.find(t => t.slug === slug);
  if (config) return config;

  // Default: keep lowercase, no description
  return {
    slug,
    name: slug,
    description: "",
  };
}
