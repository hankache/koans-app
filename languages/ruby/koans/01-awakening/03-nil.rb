# title: nil
# intro: `nil` is Ruby's "nothing". It's an object like any other, the one instance of `NilClass`, with a few methods of its own.
expect(nil).to be_nil, 'be_nil checks for nil'
expect(nil.class).to eq(___), 'nil has a class'
expect(nil.to_a).to eq(___), 'it converts to an empty array'
expect(nil.to_s).to eq(___), 'and an empty string'
expect([1, 2][5]).to eq(___), 'reading past the end of an array gives nil'
expect(nil&.length).to eq(___), '&. calls a method only when there is an object'
expect { nil.length }.to raise_error(___), 'without &. it is an error'
