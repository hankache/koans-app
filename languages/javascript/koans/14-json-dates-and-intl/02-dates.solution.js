const christmas = new Date(Date.UTC(2026, 11, 25));
expect(christmas.getUTCMonth(), 'December is month 11').toBe(11);
expect(christmas.toISOString(), 'ISO format').toBe('2026-12-25T00:00:00.000Z');
expect(christmas.getUTCDay(), 'Sunday is 0, so Friday is 5').toBe(5);
const d = new Date(Date.UTC(2026, 0, 31));
d.setUTCDate(d.getUTCDate() + 1);
expect(d.getUTCMonth(), 'one day after 31 January is in February').toBe(1);
expect((Date.UTC(2026, 0, 2) - Date.UTC(2026, 0, 1)) / 1000 / 60 / 60, 'subtracting dates gives milliseconds').toBe(24);
