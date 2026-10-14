// title: String methods
// intro: Strings come with methods. None of them changes the string: each returns a new one.
assert.equal('hello'.toUpperCase(), ___, 'upper case');
assert.equal('  pad  '.trim(), ___, 'trim removes the spaces around');
assert.equal('banana'.indexOf('n'), ___, 'where something first appears');
assert.equal('banana'.includes('nan'), ___, 'whether it appears at all');
assert.equal('koan'.startsWith('ko'), ___, 'how a string begins');
assert.equal('a-b-c'.replace('-', '+'), ___, 'replace changes the first match');
assert.equal('a-b-c'.replaceAll('-', '+'), ___, 'replaceAll changes them all');
