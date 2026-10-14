// title: Dates
// intro: A `Date` is a moment in time. Months count from 0, so January is 0 and December is 11; the `UTC` methods give the same answers wherever the code runs.
const christmas = new Date(Date.UTC(2026, 11, 25));
expect(christmas.getUTCMonth(), 'December is month 11').toBe(___);
expect(christmas.toISOString(), 'ISO format').toBe(___);
expect(christmas.getUTCDay(), 'Sunday is 0, so Friday is 5').toBe(___);
const d = new Date(Date.UTC(2026, 0, 31));
d.setUTCDate(d.getUTCDate() + 1);
expect(d.getUTCMonth(), 'one day after 31 January is in February').toBe(___);
expect((Date.UTC(2026, 0, 2) - Date.UTC(2026, 0, 1)) / 1000 / 60 / 60, 'subtracting dates gives milliseconds').toBe(___);
