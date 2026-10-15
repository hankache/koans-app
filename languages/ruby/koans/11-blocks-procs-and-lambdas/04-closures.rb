# title: Closures
# intro: A block, proc or lambda keeps the variables around it alive, and sees changes to them.
def make_counter
  count = 0
  increment = -> { count += 1 }
  read = -> { count }
  [increment, read]
end
inc, read = make_counter
3.times { inc.call }
expect(read.call).to eq(___), 'both lambdas share one count'
multiplier = 2
times = ->(n) { n * multiplier }
multiplier = 10
expect(times.(3)).to eq(___), 'a closure sees the variable, not a copy'
adders = (1..3).map { |n| ->(x) { x + n } }
expect(adders.last.(100)).to eq(___), 'each keeps its own n'
