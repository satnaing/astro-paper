import type { Props } from "astro";
import type { InferEntrySchema, RenderedContent } from "astro:content";
import { SITE } from "@/config";

export interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

type CollectionKey = "socials" | "shareLinks";

interface CollectionEntry {
  id: string;
  body?: string;
  collection: CollectionKey;
  data: InferEntrySchema<CollectionKey>;
  rendered?: RenderedContent;
  filePath?: string;
}

export async function getSocialIcons(
  list: CollectionEntry[]
): Promise<Social[]> {
  const socials: Social[] = [];

  for (const { id, data } of list) {
    // Import the icon dynamically based on the social id
    const icon = await import(`./icons/${id}.svg`).catch(() => {
      if (import.meta.env.DEV) {
        throw new Error(
          `[Socials]: Icon "${id}" not found. Please ensure the icon exists in the src/components/constants/icons directory.`
        );
      }
      return null;
    });

    // Skip if icon import failed
    if (!icon) {
      continue;
    }

    socials.push({
      ...data,
      icon: icon.default,
      linkTitle: data.linkTitle.replace("{title}", SITE.title),
    });
  }

  return socials;
}
