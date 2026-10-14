assert.are.equal(6, #'héllo', '# counts bytes: é takes two')
assert.are.equal(5, utf8.len('héllo'), 'utf8.len counts characters')
assert.are.equal(233, utf8.codepoint('é'), 'a character code')
assert.are.equal('☃', utf8.char(9731), 'and a character from one')
