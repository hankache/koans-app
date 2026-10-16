const encode = s => s.replace(/(.)\1*/g, run => run.length + run[0]);
const decode = s => s.replace(/(\d+)(\D)/g, (_, n, ch) => ch.repeat(Number(n)));
expect(encode('aaabcc'), 'each run becomes a count and a letter').toBe('3a1b2c');
expect(encode(''), 'nothing stays nothing').toBe('');
expect(decode('2x3y'), 'decoding repeats each letter').toBe('xxyyy');
expect(decode(encode('hello')), 'the round trip').toBe('hello');
expect(encode('10000').length, 'it can make a string longer').toBe(4);
