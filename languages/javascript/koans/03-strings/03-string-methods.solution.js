expect('hello'.toUpperCase(), 'upper case').toBe('HELLO');
expect('  pad  '.trim(), 'trim removes the spaces around').toBe('pad');
expect('banana'.indexOf('n'), 'where something first appears').toBe(2);
expect('banana'.lastIndexOf('n'), 'where it last appears').toBe(4);
expect('banana', 'toContain looks for a substring').toContain('nan');
expect('a-b-c'.replace('-', '+'), 'replace changes the first match').toBe('a+b-c');
expect('a-b-c'.replaceAll('-', '+'), 'replaceAll changes them all').toBe('a+b+c');
