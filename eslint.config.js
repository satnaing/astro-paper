import eslintPluginAstro from "eslint-plugin-astro";

export default [
  ...eslintPluginAstro.configs.recommended,
  { rules: { "no-console": "error" } },
  { ignores: ["dist/**", ".astro"] },
];
