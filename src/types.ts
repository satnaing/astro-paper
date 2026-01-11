/**
 * shadcn/ui compatible theme color configuration
 * Uses oklch() color format for perceptual uniformity
 *
 * @see https://ui.shadcn.com/docs/theming
 * @see https://tweakcn.com for theme presets
 */
export type ThemeColors = {
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  border: string;
  input: string;
  ring: string;
};

export type ThemeConfig = {
  name: string;
  light: ThemeColors;
  dark: ThemeColors;
};
