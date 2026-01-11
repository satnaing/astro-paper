import type { ThemeColors, ThemeConfig } from "@/types";

/**
 * Parses a tweakcn.com theme JSON and extracts the theme configuration.
 *
 * Usage:
 * 1. Fetch theme JSON from tweakcn.com
 * 2. Call parseTweakcnTheme(json) to extract the config
 * 3. Add the result to THEMES in src/config.ts
 *
 * Example:
 * ```ts
 * const response = await fetch("https://tweakcn.com/r/themes/THEME_NAME.json");
 * const json = await response.json();
 * const config = parseTweakcnTheme(json);
 * ```
 */

type TweakcnThemeJSON = {
  name: string;
  cssVars: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
};

const THEME_COLOR_KEYS: (keyof ThemeColors)[] = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
];

function extractColors(vars: Record<string, string>): ThemeColors {
  const colors: Partial<ThemeColors> = {};

  for (const key of THEME_COLOR_KEYS) {
    if (vars[key]) {
      colors[key] = vars[key];
    }
  }

  return colors as ThemeColors;
}

/**
 * Converts a tweakcn.com theme JSON to our ThemeConfig format
 */
export function parseTweakcnTheme(json: TweakcnThemeJSON): ThemeConfig {
  return {
    name: json.name,
    light: extractColors(json.cssVars.light),
    dark: extractColors(json.cssVars.dark),
  };
}

/**
 * Formats a ThemeConfig as TypeScript code for copy-pasting into config.ts
 */
export function formatThemeAsTS(
  themeName: string,
  config: ThemeConfig
): string {
  const formatColors = (colors: ThemeColors): string => {
    return Object.entries(colors)
      .map(([key, value]) => `      "${key}": "${value}",`)
      .join("\n");
  };

  return `  ${themeName}: {
    name: "${config.name}",
    light: {
${formatColors(config.light)}
    },
    dark: {
${formatColors(config.dark)}
    },
  },`;
}

export default parseTweakcnTheme;
