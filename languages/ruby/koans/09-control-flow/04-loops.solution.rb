n = 1
n *= 2 while n < 100
expect(n).to eq(128), 'while as a modifier'
count = 0
count += 1 until count == 5
expect(count).to eq(5), 'until'
found = [3, 8, 11, 14].each { |x| break x if x > 10 }
expect(found).to eq(11), 'break can return a value'
odds = []
(1..6).each do |x|
  next if x.even?
  odds << x
end
expect(odds).to eq([1, 3, 5]), 'next skips the rest of one round'
i = 0
answer = loop do
  i += 1
  break i * 10 if i == 3
end
expect(answer).to eq(30), 'loop runs until break'
