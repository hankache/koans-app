# title: Everything returns a value
# intro: Every expression in Ruby has a value: assignments, method definitions, class bodies, even `puts`.
expect(x = 5).to eq(___), 'an assignment returns the value'
expect(def koan_method = 1).to eq(___), 'def returns the method name'
expect(puts('')).to eq(___), 'puts returns nil'
expect([1, 2].each { }).to eq(___), 'each returns what it iterated over'
expect(begin; 1; 2; end).to eq(___), 'a block of code returns its last value'
expect { puts 'hello' }.to output(___).to_stdout, 'output checks what puts writes'
