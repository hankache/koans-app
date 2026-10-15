# title: Searching
# intro: `find` returns the first match, `select` and `reject` keep or drop items, `partition` does both at once, and `any?`, `all?` and `none?` ask questions.
nums = [4, 7, 10, 13]
expect(nums.find(&:odd?)).to eq(___), 'the first odd number'
expect(nums.select(&:even?)).to eq(___), 'select keeps'
expect(nums.reject(&:even?)).to eq(___), 'reject drops'
expect(nums.partition { |n| n > 8 }).to eq(___), 'partition: matches, then the rest'
expect(nums.any? { |n| n > 12 }).to eq(___), 'any?'
expect(nums.all?(Integer)).to eq(___), 'all? with a pattern'
expect(nums.count(&:even?)).to eq(___), 'count'
expect(nums.index(10)).to eq(___), 'index'
expect(nums).to all(___), 'RSpec checks every item with all'
