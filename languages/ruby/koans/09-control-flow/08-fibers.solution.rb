fiber = Fiber.new do
  Fiber.yield 1
  Fiber.yield 2
  3
end
expect(fiber.resume).to eq(1), 'resume runs to the first Fiber.yield'
expect(fiber.resume).to eq(2), 'and then on to the next'
expect(fiber.resume).to eq(3), "the last value is the block's"
expect(fiber.alive?).to eq(false), 'then the fiber is finished'
expect { fiber.resume }.to raise_error(FiberError), 'and cannot go on'
doubler = Fiber.new { |x| loop { x = Fiber.yield(x * 2) } }
expect(doubler.resume(5)).to eq(10), 'resume can pass a value in'
expect(doubler.resume(7)).to eq(14), 'which Fiber.yield then returns'
