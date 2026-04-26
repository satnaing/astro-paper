import type { UIStrings } from "./types";
import en from "./en";

const translations: Record<string, UIStrings> = { en };

export function useTranslations(locale: string = "en"): UIStrings {
  return translations[locale] ?? translations.en;
}
