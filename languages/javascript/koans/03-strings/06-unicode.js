// title: Unicode
// intro: A JavaScript string is a sequence of UTF-16 code units, so a character outside the basic range, like many emoji, takes two. Spreading a string, or `for…of`, walks whole characters instead.
expect('é'.length, 'é is one code unit').toBe(___);
expect('😀'.length, 'an emoji takes two').toBe(___);
expect([...'😀'], 'spreading gives whole characters').toHaveLength(___);
expect('😀'.codePointAt(0), 'its code point').toBe(___);
expect('é'.normalize('NFD').length, 'NFD splits é into e and an accent').toBe(___);
