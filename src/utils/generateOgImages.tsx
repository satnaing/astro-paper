import satori, { type SatoriOptions } from "satori";
import { writeFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import { getCollection } from "astro:content";
import postOgImage from "./og-templates/post";

const fetchFonts = async () => {
  // Regular Font
  const fontFileRegular = await fetch(
    "https://www.1001fonts.com/download/font/ibm-plex-mono.regular.ttf"
  );
  const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer();

  // Bold Font
  const fontFileBold = await fetch(
    "https://www.1001fonts.com/download/font/ibm-plex-mono.bold.ttf"
  );
  const fontBold: ArrayBuffer = await fontFileBold.arrayBuffer();

  return { fontRegular, fontBold };
};

const { fontRegular, fontBold } = await fetchFonts();

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "IBM Plex Mono",
      data: fontRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "IBM Plex Mono",
      data: fontBold,
      weight: 600,
      style: "normal",
    },
  ],
};

const generateOgImages = async () => {
  const postImportResult = await getCollection(
    "blog",
    ({ data }) => !data.draft
  );
  const posts = Object.values(postImportResult).filter(
    ({ data }) => !data.ogImage
  );

  const imageGenerationPromises = posts.map(async post => {
    const svg = await satori(postOgImage(post.data.title), options);

    // render png in production mode
    if (import.meta.env.MODE === "production") {
      const resvg = new Resvg(svg);
      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();

      const outputImage = `${post.slug}.png`;

      const LIGHT_BLUE = "\x1b[94m";
      const DARK_GRAY = "\x1b[30m";
      const RESET = "\x1b[0m";
      console.info(
        `  ${LIGHT_BLUE}└─${RESET} output png image:`,
        `${DARK_GRAY}/${outputImage}${RESET}`
      );

      await writeFile(`./dist/${outputImage}`, pngBuffer);
    }
  });

  // Wait for all image generation operations to complete
  await Promise.all(imageGenerationPromises);

  return null;
};

export default generateOgImages;
