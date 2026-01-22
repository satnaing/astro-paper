import type { AstroGlobal } from "astro";
import enTranslations from "@/locale/en/translation.json";

type TranslationKey = string;
type Translations = typeof enTranslations;

let translationsCache: Record<string, Translations> = {
  en: enTranslations,
};

export async function getTranslations(
  locale: string = "en"
): Promise<Translations> {
  if (locale === "en") {
    return enTranslations;
  }

  if (translationsCache[locale]) {
    return translationsCache[locale];
  }

  try {
    const translations = await import(`@/locale/${locale}/translation.json`);
    translationsCache[locale] = translations.default as Translations;
    return translationsCache[locale];
  } catch {
    return enTranslations;
  }
}

export function t(
  translations: Translations,
  key: string,
  params?: Record<string, string | number>
): string {
  const keys = key.split(".");
  let value: any = translations;

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      let fallback: any = enTranslations;
      for (const fk of keys) {
        fallback = fallback?.[fk];
      }
      value = fallback || key;
      break;
    }
  }

  let translation = typeof value === "string" ? value : key;

  if (params) {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      translation = translation.replace(`{{${paramKey}}}`, String(paramValue));
    });
  }

  return translation;
}

function getLocaleFromPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  const supportedLocales = ["en", "uk", "ru"];
  if (supportedLocales.includes(firstSegment)) {
    return firstSegment;
  }

  return "en";
}

export function getLocale(
  astro: AstroGlobal | { url: { pathname: string } }
): string {
  return getLocaleFromPath(astro.url.pathname);
}
