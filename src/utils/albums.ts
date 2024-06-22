const getAlbumImages = async ({ data }: CollectionEntry<"albums">) => {
  // 1. List all album files from collections path
  let images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/content/albums/**/*.{jpeg,jpg,png,webp}"
  );
  console.log(data);
  // 2. Filter images by albumId
  images = Object.fromEntries(
    Object.entries(images).filter(([key]) => key.includes(data.slug))
  );

  // 3. Images are promises, so we need to resolve the glob promises
  const resolvedImages = await Promise.all(
    Object.values(images).map(image => image().then(mod => mod.default))
  );

  // 4. Shuffle images in random order
  resolvedImages.sort(() => Math.random() - 0.5);
  return resolvedImages;
};

export default getAlbumImages;
