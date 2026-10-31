const warned = new Set<string>();
const valid = new Map<string, boolean>();

/**
 * Returns `zone` if it is an IANA timezone this runtime recognises, otherwise
 * falls back to UTC and warns once per bad value.
 *
 * `dayjs().tz()` throws a `RangeError` on an unrecognised name, which would abort
 * the whole build from whichever component formatted the date first. A typo in
 * `site.timezone` should degrade to UTC, not take the site down.
 */
export function resolveTimezone(zone: string | undefined): string {
  if (!zone) return "UTC";

  let ok = valid.get(zone);
  if (ok === undefined) {
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: zone });
      ok = true;
    } catch {
      ok = false;
    }
    valid.set(zone, ok);
  }
  if (ok) return zone;

  if (!warned.has(zone)) {
    warned.add(zone);
    // eslint-disable-next-line no-console
    console.warn(
      `[astro-paper] Unknown timezone "${zone}". Falling back to UTC. ` +
        `Use an IANA name such as "Asia/Bangkok" or "America/New_York".`
    );
  }
  return "UTC";
}
