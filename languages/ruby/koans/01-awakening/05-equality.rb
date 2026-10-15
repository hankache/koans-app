# title: Equality
# intro: `==` compares values, `eql?` also wants the same type, and `equal?` wants the very same object. RSpec's `eq`, `eql` and `equal` use each.
expect(1 == 1.0).to eq(___), '== compares values across types'
expect(1.eql?(1.0)).to eq(___), 'eql? also wants the same class'
a = 'koan'
b = 'koan'
expect(a == b).to eq(___), 'two strings with the same text are =='
expect(a.equal?(b)).to eq(___), 'but they are two objects'
expect(a).to equal(___), 'equal wants the very same object'
expect(:sym.equal?(:sym)).to eq(___), 'every :sym is the same object'
