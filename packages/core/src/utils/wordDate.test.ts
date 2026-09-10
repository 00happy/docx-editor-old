/**
 * Word-style `w:date` conventions (utils/wordDate + formatDate).
 *
 * Word stores comment and tracked-change dates as local wall clock with a
 * bogus `Z` suffix. The editor follows the same convention so its files
 * display identically in Word, with no 8-hour shift either way.
 */

import { describe, test, expect } from 'bun:test';

import { formatDate } from './comments';
import { nowWordDate, toWordDate, utcToWordDate } from './wordDate';

describe('wordDate', () => {
  test('toWordDate formats local wall clock, pads, and strips milliseconds', () => {
    expect(toWordDate(new Date(2026, 8, 8, 5, 7, 9, 123))).toBe('2026-09-08T05:07:09Z');
  });

  test('nowWordDate matches the wall-clock shape (no milliseconds, Z suffix)', () => {
    expect(nowWordDate()).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
  });

  test('utcToWordDate converts a true UTC stamp to this machine wall clock', () => {
    const utc = '2026-09-08T10:00:00Z';
    expect(utcToWordDate(utc)).toBe(toWordDate(new Date(utc)));
  });

  test('utcToWordDate passes through an unparseable value', () => {
    expect(utcToWordDate('not-a-date')).toBe('not-a-date');
  });
});

describe('formatDate: Word wall-clock dates', () => {
  test('renders the stored wall-clock hour — no timezone shift', () => {
    // Word (UTC+8) saved 18:00 wall clock. Must display 18:00 (6:00 PM),
    // never 02:00 (+8 misread) nor 10:00 (-8 misread).
    const out = formatDate('2026-09-08T18:00:00Z');
    // Locale may render 12-hour ("6:00 PM") or 24-hour ("18:00"); accept the
    // hour in either representation, but reject the shifted values.
    expect(out).toMatch(/(^|[^0-9])(6|18):00/);
    expect(out).not.toMatch(/(^|[^0-9])(2|14):00/); // +8 shift
    expect(out).not.toMatch(/(^|[^0-9])(10|22):00/); // -8 shift
  });

  test('accepts the same value without the Z suffix', () => {
    expect(formatDate('2026-09-08T18:00:00')).toBe(formatDate('2026-09-08T18:00:00Z'));
  });

  test('returns empty for missing or invalid dates', () => {
    expect(formatDate(undefined)).toBe('');
    expect(formatDate('')).toBe('');
    expect(formatDate('not-a-date')).toBe('');
  });
});
