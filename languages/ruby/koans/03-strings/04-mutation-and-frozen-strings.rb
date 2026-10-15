# title: Mutation and frozen strings
# intro: Strings can change in place: `<<` appends, and methods ending in `!` modify the string itself. A frozen string can't change at all.
s = +'tea'
s << ' and cake'
expect(s).to eq(___), '<< appends in place'
t = +'calm'
t.upcase!
expect(t).to eq(___), 'a ! method changes the string itself'
expect(t.upcase!).to eq(___), 'and returns nil when nothing changed'
frozen = 'still'.freeze
expect { frozen << '!' }.to raise_error(___), 'a frozen string cannot change'
expect(frozen.dup.frozen?).to eq(___), 'but a copy can'
