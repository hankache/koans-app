# title: Regular expression basics
# intro: `/pattern/` is a regular expression. `=~` gives the position of a match, `match?` asks if there is one, and `match` returns the details, groups included.
expect('order 42' =~ /\d+/).to eq(___), '=~ gives where it matched'
expect('no digits' =~ /\d/).to eq(___), 'or nil'
expect('Ruby'.match?(/ruby/i)).to eq(___), 'the i flag ignores case'
m = '2026-10-15'.match(/(\d+)-(\d+)-(\d+)/)
expect(m[2]).to eq(___), 'groups are numbered from 1'
named = 'Ada Lovelace'.match(/(?<first>\w+) (?<last>\w+)/)
expect(named[:last]).to eq(___), 'named groups'
expect('a1b2').to match(___), 'RSpec has a match matcher'
