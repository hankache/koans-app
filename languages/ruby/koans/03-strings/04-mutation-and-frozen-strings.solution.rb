s = +'tea'
s << ' and cake'
expect(s).to eq('tea and cake'), '<< appends in place'
t = +'calm'
t.upcase!
expect(t).to eq('CALM'), 'a `!` method changes the string itself'
expect(t.upcase!).to eq(nil), 'and returns nil when nothing changed'
frozen = 'still'.freeze
expect { frozen << '!' }.to raise_error(FrozenError), 'a frozen string cannot change'
expect(frozen.dup.frozen?).to eq(false), 'but a copy can'
