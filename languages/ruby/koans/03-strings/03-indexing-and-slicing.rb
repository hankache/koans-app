# title: Indexing and slicing
# intro: `s[i]` is one character; negative indexes count from the end. `s[start, length]` and `s[range]` take a slice.
s = 'enlightenment'
expect(s[0]).to eq(___), 'the first character'
expect(s[-1]).to eq(___), 'the last'
expect(s[2, 5]).to eq(___), 'a start and a length'
expect(s[2..6]).to eq(___), 'or a range'
expect(s[-4..]).to eq(___), 'an endless range goes to the end'
expect(s[100]).to eq(___), 'past the end'
expect(s['light']).to eq(___), 'a string index finds a substring'
