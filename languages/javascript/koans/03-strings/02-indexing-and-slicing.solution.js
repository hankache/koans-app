const s = 'JavaScript';
expect(s[0], 'the first character').toBe('J');
expect(s.at(-1), 'at(-1) is the last').toBe('t');
expect(s.slice(0, 4), 'a slice stops before its end').toBe('Java');
expect(s.slice(-6), 'or counts from the end').toBe('Script');
expect(s[100], 'past the end there is nothing').toBe(undefined);
expect(s, 'toHaveLength works on strings').toHaveLength(10);
