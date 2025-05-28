import fs from "fs";
import path from "path";

async function loadLocalFont(
  fontPath: string
): Promise<ArrayBuffer> {
  try {
    // 读取本地字体文件
    const fontBuffer = fs.readFileSync(fontPath);
    return fontBuffer.buffer.slice(
      fontBuffer.byteOffset,
      fontBuffer.byteOffset + fontBuffer.byteLength
    );
  } catch (error) {
    throw new Error(`Failed to load local font: ${fontPath}. Error: ${error}`);
  }
}

async function loadGoogleFonts(
  text: string
): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const fontsConfig = [
    {
      name: "IBM Plex Sans SC",
      fontPath: "public/fonts/IBMPlexSansSC-Regular.woff",
      weight: 400,
      style: "normal",
    },
    {
      name: "IBM Plex Sans SC",
      fontPath: "public/fonts/IBMPlexSansSC-Bold.woff",
      weight: 700,
      style: "bold",
    },
  ];

  const fonts = await Promise.all(
    fontsConfig.map(async ({ name, fontPath, weight, style }) => {
      // 解析相对于项目根目录的绝对路径
      const absoluteFontPath = path.resolve(process.cwd(), fontPath);
      const data = await loadLocalFont(absoluteFontPath);
      return { name, data, weight, style };
    })
  );

  return fonts;
}

export default loadGoogleFonts;
