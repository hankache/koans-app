// title: Intl
// intro: `Intl` formats numbers, currencies, dates and lists the way people in a given locale expect them.
expect(new Intl.NumberFormat('en-US').format(1234567.891), 'grouping and decimals').toBe(___);
expect(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(1234.5), 'a currency').toBe(___);
expect(new Intl.NumberFormat('en-US', { style: 'percent' }).format(0.25), 'a percentage').toBe(___);
expect(new Intl.ListFormat('en', { type: 'conjunction' }).format(['tea', 'cake', 'jam']), 'a list').toBe(___);
expect(new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' }).format(Date.UTC(2026, 9, 15)), 'a month name').toBe(___);
