# title: Composition and currying
# intro: `>>` and `<<` compose procs and methods into a pipeline; `curry` lets a lambda take its arguments one at a time.
add_one = ->(n) { n + 1 }
double = ->(n) { n * 2 }
expect((add_one >> double).(3)).to eq(___), '>> runs left to right'
expect((add_one << double).(3)).to eq(___), '<< runs right to left'
add = ->(a, b, c) { a + b + c }
expect(add.curry[1][2][3]).to eq(___), 'curry takes one at a time'
add_ten = add.curry[4][6]
expect(add_ten[5]).to eq(___), 'a partly applied lambda'
shout = :upcase.to_proc >> ->(s) { s + '!' }
expect(%w[hi yo].map(&shout)).to eq(___), 'compose with a symbol'
