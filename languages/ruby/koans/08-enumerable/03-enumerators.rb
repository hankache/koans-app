# title: Enumerators
# intro: Without a block, most iterating methods return an `Enumerator`, which can be chained, or stepped through one item at a time with `next`.
e = [10, 20, 30].each
expect(e.next).to eq(___), 'next gives one item'
expect(e.next).to eq(___), 'then the next'
e.next
expect { e.next }.to raise_error(___), 'and stops at the end'
expect([3, 1, 2].each_with_index.to_a).to eq(___), 'an enumerator turns into an array'
fib = Enumerator.new do |y|
  a, b = 0, 1
  loop { y << a; a, b = b, a + b }
end
expect(fib.take(7)).to eq(___), 'an enumerator of your own'
