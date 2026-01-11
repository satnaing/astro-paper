/**
 * Get theme colors for OG image generation
 * Converts oklch theme colors to hex for Satori compatibility
 */

import { THEMES, ACTIVE_THEME } from "@/config";
import { oklchToHex } from "./oklchToHex";

const theme = THEMES[ACTIVE_THEME];

// OG images use light mode colors for consistent social previews
const colors = theme.light;

export const ogColors = {
  background: oklchToHex(colors.background),
  foreground: oklchToHex(colors.foreground),
  muted: oklchToHex(colors.muted),
  primary: oklchToHex(colors.primary),
  border: oklchToHex(colors.border),
};

export default ogColors;
