/**
 * Word-style `w:date` helpers.
 *
 * Word stores comment and tracked-change dates (`w:date` on `w:comment`,
 * `w:ins`, `w:del`, …) as LOCAL wall clock with a bogus `Z` suffix — a
 * long-standing quirk. The reliable UTC timestamp for comments lives only in
 * commentsExtensible.xml (`w16cex:dateUtc`); tracked changes have no such
 * companion part. The editor follows the wall-clock convention on write so
 * its files render identically in Word.
 */

/** Current time as Word-style `w:date`: local wall clock + `Z`, no milliseconds. */
export function nowWordDate(): string {
  return toWordDate(new Date());
}

/** Format a Date as Word-style `w:date`: local wall clock + `Z`, no milliseconds. */
export function toWordDate(date: Date): string {
  const pad = (n: number): string => String(n).padStart(2, '0');
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}Z`
  );
}

/**
 * True UTC timestamp (e.g. `w16cex:dateUtc`) → Word-style wall clock in the
 * viewer's local time. Falls back to the input when unparseable.
 */
export function utcToWordDate(utcDateStr: string): string {
  const d = new Date(utcDateStr);
  return isNaN(d.getTime()) ? utcDateStr : toWordDate(d);
}
