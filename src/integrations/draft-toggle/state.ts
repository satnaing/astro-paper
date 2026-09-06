// Server-authoritative in-memory flag, shared for the lifetime of the dev
// server process (intentionally not persisted across restarts).
//
// Stored on `globalThis` under a global symbol rather than as a plain module
// export: the integration hook runs outside Vite's SSR module graph while
// app code (postFilter.ts) runs inside it, so the two sides load this file
// through separate module registries and would otherwise each get their own
// object, silently desyncing the toggle from what pages render.
const KEY = Symbol.for("astro-paper:draft-toggle-state");

type DraftToggleState = { showDrafts: boolean };

const globalWithState = globalThis as typeof globalThis & {
  [KEY]?: DraftToggleState;
};

export const draftToggleState: DraftToggleState = (globalWithState[KEY] ??= {
  showDrafts: false,
});
