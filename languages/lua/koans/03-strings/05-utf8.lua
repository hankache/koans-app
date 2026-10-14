-- title: UTF-8
-- intro: Lua's strings are bytes. The `utf8` library counts and reads characters, which may take several bytes each.
assert.are.equal(___, #'héllo', '# counts bytes: é takes two')
assert.are.equal(___, utf8.len('héllo'), 'utf8.len counts characters')
assert.are.equal(___, utf8.codepoint('é'), 'a character code')
assert.are.equal(___, utf8.char(9731), 'and a character from one')
