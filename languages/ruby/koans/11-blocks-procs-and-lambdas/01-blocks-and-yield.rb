# title: Blocks and yield
# intro: Any method can take a block. `yield` runs it, with arguments, and gets its value back; `block_given?` asks whether there is one.
def twice
  [yield(1), yield(2)]
end
expect(twice { |n| n * 10 }).to eq(___), 'yield runs the block'
def maybe
  block_given? ? yield : 'no block'
end
expect(maybe).to eq(___), 'block_given?'
expect(maybe { 'block' }).to eq(___), 'with one'
def timed
  result = yield
  "done: #{result}"
end
expect(timed { 6 * 7 }).to eq(___), 'code around a block'
