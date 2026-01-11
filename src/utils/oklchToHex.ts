/**
 * Converts oklch color string to hex format
 * Used for OG image generation where Satori requires hex/rgb colors
 */

type RGB = { r: number; g: number; b: number };

/**
 * Parse oklch string like "oklch(0.9818 0.0054 95.0986)" to components
 */
function parseOklch(oklch: string): { l: number; c: number; h: number } {
  const match = oklch.match(/oklch\(([^\s]+)\s+([^\s]+)\s+([^\s)]+)\)/);
  if (!match) {
    throw new Error(`Invalid oklch format: ${oklch}`);
  }
  return {
    l: parseFloat(match[1]),
    c: parseFloat(match[2]),
    h: parseFloat(match[3]),
  };
}

/**
 * Convert oklch to linear sRGB
 * Based on CSS Color Level 4 spec
 */
function oklchToLinearRgb(l: number, c: number, h: number): RGB {
  // Convert to oklab first
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  // oklab to linear RGB via LMS
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const lCubed = l_ * l_ * l_;
  const mCubed = m_ * m_ * m_;
  const sCubed = s_ * s_ * s_;

  return {
    r: 4.0767416621 * lCubed - 3.3077115913 * mCubed + 0.2309699292 * sCubed,
    g: -1.2684380046 * lCubed + 2.6097574011 * mCubed - 0.3413193965 * sCubed,
    b: -0.0041960863 * lCubed - 0.7034186147 * mCubed + 1.707614701 * sCubed,
  };
}

/**
 * Apply sRGB gamma correction
 */
function linearToSrgb(value: number): number {
  if (value <= 0.0031308) {
    return 12.92 * value;
  }
  return 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
}

/**
 * Clamp value to 0-255 range
 */
function clamp(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value * 255)));
}

/**
 * Convert RGB to hex string
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => clamp(n).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Convert oklch color string to hex
 * @param oklch - Color in format "oklch(L C H)" where L is 0-1, C is 0-0.4+, H is 0-360
 * @returns Hex color string like "#ffffff"
 */
export function oklchToHex(oklch: string): string {
  const { l, c, h } = parseOklch(oklch);
  const linear = oklchToLinearRgb(l, c, h);
  const r = linearToSrgb(linear.r);
  const g = linearToSrgb(linear.g);
  const b = linearToSrgb(linear.b);
  return rgbToHex(r, g, b);
}

export default oklchToHex;
