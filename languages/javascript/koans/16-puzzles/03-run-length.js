// title: Run-length encoding
// intro: Run-length encoding squeezes repeats: `aaab` becomes `3a1b`. A regular expression finds the runs, and another one undoes them.
const encode = s => s.replace(/(.)\1*/g, run => run.length + run[0]);
const decode = s => s.replace(/(\d+)(\D)/g, (_, n, ch) => ch.repeat(Number(n)));
expect(encode('aaabcc'), 'each run becomes a count and a letter').toBe(___);
expect(encode(''), 'nothing stays nothing').toBe(___);
expect(decode('2x3y'), 'decoding repeats each letter').toBe(___);
expect(decode(encode('hello')), 'the round trip').toBe(___);
expect(encode('10000').length, 'it can make a string longer').toBe(___);
