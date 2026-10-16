# title: Fibers
# intro: A `Fiber` is a block that can pause: `Fiber.yield` hands a value back to whoever called `resume`, and the next `resume` carries on from there.
fiber = Fiber.new do
  Fiber.yield 1
  Fiber.yield 2
  3
end
expect(fiber.resume).to eq(___), 'resume runs to the first Fiber.yield'
expect(fiber.resume).to eq(___), 'and then on to the next'
expect(fiber.resume).to eq(___), "the last value is the block's"
expect(fiber.alive?).to eq(___), 'then the fiber is finished'
expect { fiber.resume }.to raise_error(___), 'and cannot go on'
doubler = Fiber.new { |x| loop { x = Fiber.yield(x * 2) } }
expect(doubler.resume(5)).to eq(___), 'resume can pass a value in'
expect(doubler.resume(7)).to eq(___), 'which Fiber.yield then returns'
