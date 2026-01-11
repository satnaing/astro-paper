---
author: Pascal Andy
title: "shadcn Theme System for AstroPaper"
description: "How to use and customize the shadcn/ui compatible theme system in AstroPaper, including adding themes from tweakcn.com"
date_created: 2026-01-11
tags:
  - dev-notes
---

AstroPaper now supports [shadcn/ui](https://ui.shadcn.com/) compatible themes, allowing you to easily apply beautiful, professionally designed color schemes from [tweakcn.com](https://tweakcn.com) and other sources.

## Overview

The theme system uses CSS custom properties (variables) with the modern `oklch()` color format for perceptually uniform colors. Each theme provides both light and dark mode variants that work seamlessly with AstroPaper's existing theme toggle.

### Key Features

- **Build-time theme injection** - Zero runtime overhead
- **Full shadcn variable system** - 19 semantic color variables
- **Light/dark mode support** - Each theme includes both variants
- **Easy theme switching** - Change one line in config to switch themes
- **Type-safe configuration** - Full TypeScript support

## Configuration

### Theme Structure

Themes are defined in `src/config.ts` using the `THEMES` object:

```typescript
import type { ThemeConfig } from "./types";

export const THEMES: Record<string, ThemeConfig> = {
  caffeine: {
    name: "Caffeine",
    light: {
      background: "oklch(0.9821 0 0)",
      foreground: "oklch(0.2435 0 0)",
      primary: "oklch(0.4341 0.0392 41.9938)",
      // ... other colors
    },
    dark: {
      background: "oklch(0.1776 0 0)",
      foreground: "oklch(0.9491 0 0)",
      primary: "oklch(0.9247 0.0524 66.1732)",
      // ... other colors
    },
  },
};

export const ACTIVE_THEME: keyof typeof THEMES = "caffeine";
```

### Switching Themes

To switch themes, simply change the `ACTIVE_THEME` value:

```typescript
// Change from "caffeine" to your desired theme
export const ACTIVE_THEME: keyof typeof THEMES = "yourThemeName";
```

Then rebuild the site:

```bash
npm run build
```

## Adding New Themes

### From tweakcn.com

1. **Browse themes** at [tweakcn.com](https://tweakcn.com)

2. **Get the theme JSON**:

   ```bash
   curl https://tweakcn.com/r/themes/THEME_NAME.json
   ```

3. **Extract the colors** from `cssVars.light` and `cssVars.dark`

4. **Add to `src/config.ts`**:

   ```typescript
   export const THEMES: Record<string, ThemeConfig> = {
     caffeine: {
       /* existing */
     },

     newTheme: {
       name: "New Theme",
       light: {
         background: "oklch(...)",
         foreground: "oklch(...)",
         // ... paste light colors
       },
       dark: {
         background: "oklch(...)",
         foreground: "oklch(...)",
         // ... paste dark colors
       },
     },
   };
   ```

5. **Activate the theme**:
   ```typescript
   export const ACTIVE_THEME: keyof typeof THEMES = "newTheme";
   ```

### Using the Parse Utility

AstroPaper includes a utility to help convert tweakcn JSON to the config format:

```typescript
import { parseTweakcnTheme, formatThemeAsTS } from "@/utils/parseTheme";

// Fetch and parse a theme
const response = await fetch("https://tweakcn.com/r/themes/THEME_NAME.json");
const json = await response.json();
const config = parseTweakcnTheme(json);

// Format as TypeScript for copy-pasting
const tsCode = formatThemeAsTS("themeName", config);
console.log(tsCode);
```

## Available CSS Variables

The theme system provides these semantic color variables:

| Variable                   | Purpose                     |
| -------------------------- | --------------------------- |
| `--background`             | Page background             |
| `--foreground`             | Primary text color          |
| `--card`                   | Card/surface background     |
| `--card-foreground`        | Card text color             |
| `--popover`                | Popover/dropdown background |
| `--popover-foreground`     | Popover text color          |
| `--primary`                | Primary brand/action color  |
| `--primary-foreground`     | Text on primary color       |
| `--secondary`              | Secondary/subtle actions    |
| `--secondary-foreground`   | Text on secondary           |
| `--muted`                  | Muted/disabled backgrounds  |
| `--muted-foreground`       | Muted text                  |
| `--accent`                 | Accent/highlight color      |
| `--accent-foreground`      | Text on accent              |
| `--destructive`            | Error/danger color          |
| `--destructive-foreground` | Text on destructive         |
| `--border`                 | Border color                |
| `--input`                  | Input field borders         |
| `--ring`                   | Focus ring color            |

### Using in Components

In Astro components, use Tailwind utilities:

```astro
<!-- Using Tailwind utilities -->
<div class="bg-background text-foreground">
  <a class="text-primary hover:text-primary/80">Link</a>
  <button class="bg-primary text-primary-foreground">Button</button>
</div>
```

Or use CSS variables directly:

```css
.custom-element {
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
}
```

## Backward Compatibility

For backward compatibility with existing AstroPaper components:

- `text-accent` maps to `--primary` (the main brand color)
- All existing Tailwind color utilities continue to work

## Theme Types

The TypeScript types are defined in `src/types.ts`:

```typescript
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
```

## How It Works

1. **Build time**: `Layout.astro` reads the active theme from `config.ts`
2. **CSS injection**: Theme colors are injected as CSS variables in the `<head>`
3. **Tailwind mapping**: `global.css` maps CSS variables to Tailwind color utilities
4. **Runtime toggle**: The existing light/dark toggle switches `data-theme` attribute

This approach provides:

- Zero JavaScript runtime overhead for theming
- Instant theme switching via CSS
- Full SSG compatibility
- Type-safe theme configuration

## Example: Creating a Custom Theme

Here's how to create your own theme:

```typescript
// In src/config.ts
export const THEMES: Record<string, ThemeConfig> = {
  // ... existing themes

  ocean: {
    name: "Ocean",
    light: {
      background: "oklch(0.98 0.01 220)",
      foreground: "oklch(0.20 0.02 220)",
      card: "oklch(0.99 0.005 220)",
      "card-foreground": "oklch(0.20 0.02 220)",
      popover: "oklch(0.99 0.005 220)",
      "popover-foreground": "oklch(0.20 0.02 220)",
      primary: "oklch(0.50 0.15 220)",
      "primary-foreground": "oklch(1.00 0 0)",
      secondary: "oklch(0.90 0.05 220)",
      "secondary-foreground": "oklch(0.30 0.05 220)",
      muted: "oklch(0.95 0.01 220)",
      "muted-foreground": "oklch(0.50 0.02 220)",
      accent: "oklch(0.92 0.02 220)",
      "accent-foreground": "oklch(0.20 0.02 220)",
      destructive: "oklch(0.60 0.20 25)",
      "destructive-foreground": "oklch(1.00 0 0)",
      border: "oklch(0.88 0.02 220)",
      input: "oklch(0.88 0.02 220)",
      ring: "oklch(0.50 0.15 220)",
    },
    dark: {
      background: "oklch(0.18 0.02 220)",
      foreground: "oklch(0.95 0.01 220)",
      // ... dark mode colors
    },
  },
};
```

## Resources

- [tweakcn.com](https://tweakcn.com) - Theme editor and presets
- [shadcn/ui Theming Docs](https://ui.shadcn.com/docs/theming) - Official theming guide
- [OKLCH Color Picker](https://oklch.com/) - Tool for creating oklch colors
