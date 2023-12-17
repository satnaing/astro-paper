import type { CollectionEntry } from "astro:content";

const getPostsByTag = (posts: CollectionEntry<"blog">[], tag: string) => {
  // Map over each post
  const transformedPosts = posts.map(post => {
    // Create a new post object
    const newPost = {
      ...post,
      data: {
        ...post.data,
        // Transform each tag: replace spaces with hyphens and convert to lowercase
        tags: post.data.tags.map(tag =>
          tag.replace(/\s/g, "-").toLocaleLowerCase()
        ),
      },
    };
    return newPost;
  });

  // Filter the posts to include only those that contain the specified tag
  const filteredPosts = transformedPosts.filter(post =>
    post.data.tags.includes(tag)
  );

  return filteredPosts;
};

export default getPostsByTag;
