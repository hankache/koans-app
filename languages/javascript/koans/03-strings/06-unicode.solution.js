expect('é'.length, 'é is one code unit').toBe(1);
expect('😀'.length, 'an emoji takes two').toBe(2);
expect([...'😀'], 'spreading gives whole characters').toHaveLength(1);
expect('😀'.codePointAt(0), 'its code point').toBe(128512);
expect('é'.normalize('NFD').length, 'NFD splits é into e and an accent').toBe(2);
