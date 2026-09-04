// Cross-platform stand-in for the previous `cp -r dist/pagefind public/`
// build step: cmd.exe, the shell npm/pnpm runs scripts with on Windows,
// has no `cp`, so the full build used to fail there. Keeping the index in
// public/ lets `astro dev` and subsequent builds serve it.
import { cpSync } from "node:fs";

cpSync("dist/pagefind", "public/pagefind", { recursive: true, force: true });
