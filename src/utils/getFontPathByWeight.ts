import type { FontData } from "astro:assets";

export function getFontPathByWeight(
  fonts: FontData[],
  weight: number,
  options?: {
    style?: "normal" | "italic";
    format?: string;
  }
): string | undefined {
  const style = options?.style ?? "normal";
  const format = options?.format ?? "truetype";

  return fonts
    .find(font => font.weight === String(weight) && font.style === style)
    ?.src.find(file => file.format === format)?.url;
}
