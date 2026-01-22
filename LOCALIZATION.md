# Astro Paper Localization

This project supports internationalization through a translation system with Crowdin integration.

## Structure

- `src/locale/en/translation.json` - source translations (English)
- `src/utils/getTranslations.ts` - utility for loading translations
- `crowdin.yml` - Crowdin configuration

## Using Translations

### In Astro Components

```astro
---
import { getTranslations, t } from "@/utils/getTranslations";

const translations = await getTranslations();
---

<h1>{t(translations, "home.heroTitle")}</h1>
```

### Parameters in Translations

If you need to pass parameters:

```json
{
  "common": {
    "welcome": "Welcome, {{name}}!"
  }
}
```

```astro
{t(translations, "common.welcome", { name: "John" })}
```

## Adding New Translations

1. Add a new key to `src/locale/en/translation.json`
2. Use it in components via `t(translations, "your.key")`
3. Upload changes to Crowdin

## Crowdin Setup

### Installing Crowdin CLI

```bash
npm install -g @crowdin/cli
```

or

```bash
brew install crowdin
```

### Environment Variables Setup

Create a `.env` file or set environment variables:

```bash
export CROWDIN_PROJECT_ID="your-project-id"
export CROWDIN_PERSONAL_TOKEN="your-personal-token"
```

### Uploading Translations to Crowdin

```bash
crowdin upload sources
```

or use npm script:

```bash
pnpm run i18n:upload
```

### Downloading Translations from Crowdin

```bash
crowdin download
```

or use npm script:

```bash
pnpm run i18n:download
```

This will download translations to `src/locale/{locale}/translation.json`

## translation.json Structure

Translations are organized by categories:

- `common` - common strings (buttons, menu, etc.)
- `navigation` - navigation
- `home` - home page
- `search` - search
- `archives` - archives
- `tags` - tags
- `error` - errors
- `breadcrumb` - breadcrumb navigation

## Supported Languages

By default, English (`en`) is supported. To add new languages:

1. Create a folder `src/locale/{locale}/`
2. Copy `translation.json` from the English version
3. Translate the strings
4. Or use Crowdin for automatic translation

## Language Detection

Language is automatically detected from URL:
- `/` - English (default)
- `/uk/` - Ukrainian
- `/ru/` - Russian

To change the language detection logic, edit the `getLocaleFromPath` function in `src/utils/getTranslations.ts`.

## Workflow

1. Add or update source strings in `src/locale/en/translation.json`
2. Use translations in components with `t(translations, "key.path")`
3. Upload source file to Crowdin: `pnpm run i18n:upload`
4. Translators work on translations in Crowdin
5. Download completed translations: `pnpm run i18n:download`
6. Translations are automatically loaded based on URL path
