def twice
  [yield(1), yield(2)]
end
expect(twice { |n| n * 10 }).to eq([10, 20]), 'yield runs the block'
def maybe
  block_given? ? yield : 'no block'
end
expect(maybe).to eq('no block'), 'block_given?'
expect(maybe { 'block' }).to eq('block'), 'with one'
def timed
  result = yield
  "done: #{result}"
end
expect(timed { 6 * 7 }).to eq('done: 42'), 'code around a block'
