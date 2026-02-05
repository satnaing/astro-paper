import { ui, defaultLang, lang } from "./ui";

//Return lang constant from ui.ts, if exist in translated ui. Return default lang if not
export function getLang() {
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
