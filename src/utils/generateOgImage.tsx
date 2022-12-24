import satori, { SatoriOptions } from "satori";
import { SITE } from "@config";

const fetchFont = async () => {
  const fontFile = await fetch(
    "https://www.1001fonts.com/download/font/ibm-plex-mono.regular.ttf"
  );
  const fontData: ArrayBuffer = await fontFile.arrayBuffer();
  return fontData;
};

const fontData = await fetchFont();

const ogImage = (text = "hello") => {
  return (
    <div style={{ color: "black", display: "flex" }}>
      {text}
      <p>{SITE.author}</p>
    </div>
  );
};

const options: SatoriOptions = {
  width: 600,
  height: 400,
  fonts: [
    {
      name: "IBM Plex Mono",
      data: fontData,
      weight: 400,
      style: "normal",
    },
  ],
};

const generateOgImage = async (mytext: string) =>
  await satori(ogImage(mytext), options);

export default generateOgImage;
