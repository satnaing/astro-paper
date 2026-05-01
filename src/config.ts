import userConfig from "@/astro-paper.config";
import type { ResolvedAstroPaperConfig } from "@/types/config";

const config: ResolvedAstroPaperConfig = {
  site: userConfig.site,
  posts: {
    perPage: userConfig.posts?.perPage ?? 4,
    perIndex: userConfig.posts?.perIndex ?? 4,
    scheduledPostMargin: userConfig.posts?.scheduledPostMargin ?? 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: userConfig.features?.lightAndDarkMode ?? true,
    dynamicOgImage: userConfig.features?.dynamicOgImage ?? true,
    showArchives: userConfig.features?.showArchives ?? true,
    showBackButton: userConfig.features?.showBackButton ?? true,
    editPost: userConfig.features?.editPost,
    search: userConfig.features?.search ?? "pagefind",
    toc: userConfig.features?.toc ?? false,
    comments: userConfig.features?.comments ?? false,
    analytics: userConfig.features?.analytics ?? false,
  },
  socials: userConfig.socials ?? [],
  shareLinks: userConfig.shareLinks ?? [],
};

export default config;
