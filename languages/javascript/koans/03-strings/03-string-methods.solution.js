assert.equal('hello'.toUpperCase(), 'HELLO', 'upper case');
assert.equal('  pad  '.trim(), 'pad', 'trim removes the spaces around');
assert.equal('banana'.indexOf('n'), 2, 'where something first appears');
assert.equal('banana'.includes('nan'), true, 'whether it appears at all');
assert.equal('koan'.startsWith('ko'), true, 'how a string begins');
assert.equal('a-b-c'.replace('-', '+'), 'a+b-c', 'replace changes the first match');
assert.equal('a-b-c'.replaceAll('-', '+'), 'a+b+c', 'replaceAll changes them all');
