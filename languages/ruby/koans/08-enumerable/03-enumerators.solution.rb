e = [10, 20, 30].each
expect(e.next).to eq(10), 'next gives one item'
expect(e.next).to eq(20), 'then the next'
e.next
expect { e.next }.to raise_error(StopIteration), 'and stops at the end'
expect([3, 1, 2].each_with_index.to_a).to eq([[3, 0], [1, 1], [2, 2]]), 'an enumerator turns into an array'
fib = Enumerator.new do |y|
  a, b = 0, 1
  loop { y << a; a, b = b, a + b }
end
expect(fib.take(7)).to eq([0, 1, 1, 2, 3, 5, 8]), 'an enumerator of your own'
