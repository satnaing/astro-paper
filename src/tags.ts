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
    slug: "dummy",
    name: "Dummy",
    description: "Placeholder content for development",
  },
  {
    slug: "docs",
    name: "Docs",
    description: "Documentation and guides",
  },
  {
    slug: "misc",
    name: "Misc",
    description: "Miscellaneous posts",
  },
  {
    slug: "release",
    name: "Release",
    description: "Release notes and updates",
  },
  {
    slug: "example",
    name: "Example",
    description: "Example posts and demos",
  },
];

/**
 * Get tag config by slug
 * Returns default values if tag is not configured
 */
export function getTagConfig(slug: string): TagConfig {
  const config = TAGS.find(t => t.slug === slug);
  if (config) return config;

  // Default: capitalize first letter, no description
  return {
    slug,
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    description: "",
  };
}
