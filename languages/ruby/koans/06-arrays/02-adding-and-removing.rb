# title: Adding and removing
# intro: `push` (or `<<`) and `pop` work at the end, `unshift` and `shift` at the start; `insert`, `delete` and `delete_at` anywhere.
a = [2, 3]
a << 4
a.unshift(1)
expect(a).to eq(___), '<< and unshift'
expect(a.pop).to eq(___), 'pop takes from the end'
expect(a.shift).to eq(___), 'shift from the start'
a.insert(1, :x)
expect(a).to eq(___), 'insert at an index'
a.delete(:x)
expect(a).to eq(___), 'delete a value'
expect([1, nil, 2, nil].compact).to eq(___), 'compact drops nils'
