expect('order 42' =~ /\d+/).to eq(6), '=~ gives where it matched'
expect('no digits' =~ /\d/).to eq(nil), 'or nil'
expect('Ruby'.match?(/ruby/i)).to eq(true), 'the i flag ignores case'
m = '2026-10-15'.match(/(\d+)-(\d+)-(\d+)/)
expect(m[2]).to eq('10'), 'groups are numbered from 1'
named = 'Ada Lovelace'.match(/(?<first>\w+) (?<last>\w+)/)
expect(named[:last]).to eq('Lovelace'), 'named groups'
expect('a1b2').to match(/\d/), 'RSpec has a match matcher'
