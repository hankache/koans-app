# title: Characters and bytes
# intro: Strings are UTF-8 by default. A character can take several bytes, so `length` and `bytesize` can differ.
word = 'café'
expect(word.length).to eq(___), 'four characters'
expect(word.bytesize).to eq(___), 'but five bytes: é takes two'
expect(word.chars.last).to eq(___), 'chars splits into characters'
expect('A'.ord).to eq(___), 'ord gives the code point'
expect(97.chr).to eq(___), 'chr goes back'
expect('abc'.each_char.map(&:upcase)).to eq(___), 'each_char'
expect(word.encoding.to_s).to eq(___), 'the encoding'
