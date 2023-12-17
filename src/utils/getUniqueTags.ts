import type { CollectionEntry } from "astro:content";

const getUniqueTags = (posts: CollectionEntry<"blog">[]) => {
  const filteredPosts = posts.filter(({ data }) => !data.draft);
  const tags: string[] = filteredPosts
    .flatMap(post => post.data.tags)
    // Transform each tag: replace spaces with hyphens and convert to lowercase
    .map(tag => tag.replace(/\s/g, "-").toLocaleLowerCase())
    .filter(
      (value: string, index: number, self: string[]) =>
        self.indexOf(value) === index
    )
    .sort((tagA: string, tagB: string) => tagA.localeCompare(tagB));
  return tags;
};

export default getUniqueTags;
