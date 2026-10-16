expect(new Intl.NumberFormat('en-US').format(1234567.891), 'grouping and decimals').toBe('1,234,567.891');
expect(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(1234.5), 'a currency').toBe('$1,234.50');
expect(new Intl.NumberFormat('en-US', { style: 'percent' }).format(0.25), 'a percentage').toBe('25%');
expect(new Intl.ListFormat('en', { type: 'conjunction' }).format(['tea', 'cake', 'jam']), 'a list').toBe('tea, cake, and jam');
expect(new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' }).format(Date.UTC(2026, 9, 15)), 'a month name').toBe('October');
