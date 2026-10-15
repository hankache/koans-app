# title: Truth
# intro: In Ruby only `false` and `nil` are falsy. Everything else counts as true in a condition: `0`, the empty string, the empty array.
expect(0 ? 'yes' : 'no').to eq(___), 'zero is true in Ruby'
expect('' ? 'yes' : 'no').to eq(___), 'so is the empty string'
expect(nil ? 'yes' : 'no').to eq(___), 'nil is falsy'
expect([]).to be_truthy, 'be_truthy: anything but nil or false'
expect(!!nil).to eq(___), '!! turns a value into true or false'
expect(nil || 'default').to eq(___), '|| gives the right side when the left is falsy'
expect(false && raise('never runs')).to eq(___), '&& stops at the first falsy value'
