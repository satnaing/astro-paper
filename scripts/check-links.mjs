/**
 * Smoke test for links used in blog posts.
 *
 * Scans the built site for external links and checks that they still resolve.
 * External URLs in posts tend to rot silently, so this runs after the build
 * in CI and fails the pipeline when a link is no longer reachable.
 *
 * Usage: node scripts/check-links.mjs [--max-failures <n>] [--timeout <ms>]
 */

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";

const DIST_DIR = new URL("../dist/", import.meta.url).pathname;

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  const value = Number(args[index + 1]);
  return Number.isFinite(value) ? value : fallback;
};

/* eslint-disable no-console -- CLI output is the point of this script */

/** How many broken links are tolerated before the check fails. */
const MAX_FAILURES = getArg("--max-failures", 0);
/** Per-request timeout in milliseconds. */
const TIMEOUT = getArg("--timeout", 10000);
/** How many links are checked at the same time. */
const CONCURRENCY = getArg("--concurrency", 10);

const SKIPPED_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "[::1]",
  "example.com",
  "www.example.com",
]);

/** Hosts that block automated requests but are otherwise fine. */
const IGNORED_HOSTS = new Set([
  "twitter.com",
  "x.com",
  "instagram.com",
  "facebook.com",
  "linkedin.com",
  "youtube.com",
  "youtu.be",
  "discord.gg",
  "t.me",
  "reddit.com",
]);

const isExternal = (href) => /^https?:\/\//i.test(href);

const collectHtmlFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectHtmlFiles(full)));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
};

const extractLinks = (html) => {
  const links = new Set();
  const pattern = /href="([^"]+)"/g;
  let match = pattern.exec(html);
  while (match !== null) {
    const href = match[1];
    if (isExternal(href)) links.add(href);
    match = pattern.exec(html);
  }
  return links;
};

const shouldSkip = (url) => {
  try {
    const { hostname } = new URL(url);
    if (SKIPPED_HOSTS.has(hostname)) return true;
    if (IGNORED_HOSTS.has(hostname)) return true;
    return IGNORED_HOSTS.has(hostname.replace(/^www\./, ""));
  } catch {
    return true;
  }
};

/** Some servers reject HEAD, so retry with GET when HEAD is not allowed. */
const checkUrl = async (url) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    let response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "astro-paper-link-check/1.0" },
    });

    if (response.status === 405 || response.status === 501) {
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "astro-paper-link-check/1.0" },
      });
    }

    return { url, status: response.status, ok: response.ok };
  } catch (error) {
    return {
      url,
      status: 0,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timer);
  }
};

const runWithConcurrency = async (items, worker, limit) => {
  const results = [];
  let index = 0;
  const runners = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (index < items.length) {
        const current = index++;
        results.push(await worker(items[current]));
      }
    },
  );
  await Promise.all(runners);
  return results;
};

const main = async () => {
  let files;
  try {
    files = await collectHtmlFiles(DIST_DIR);
  } catch {
    console.error("No dist/ directory found — run the build first.");
    process.exit(1);
  }

  const links = new Set();
  for (const file of files) {
    const html = await readFile(file, "utf8");
    for (const href of extractLinks(html)) {
      links.add(href);
    }
  }

  const targets = [...links].filter((href) => !shouldSkip(href)).sort();

  if (targets.length === 0) {
    console.log("No external links to check.");
    return;
  }

  console.log(
    `Checking ${targets.length} external links found in ${files.length} files...\n`,
  );

  const results = await runWithConcurrency(targets, checkUrl, CONCURRENCY);

  const failures = results.filter((result) => !result.ok);

  for (const failure of failures) {
    const reason = failure.error ?? `HTTP ${failure.status}`;
    console.error(`BROKEN  ${failure.url}  (${reason})`);
  }

  console.log(
    `\n${results.length - failures.length}/${results.length} links OK, ${failures.length} broken.`,
  );

  if (failures.length > MAX_FAILURES) {
    console.error(
      `\n${failures.length} broken link(s) found (tolerance: ${MAX_FAILURES}).`,
    );
    process.exit(1);
  }
};

await main();
