fizzbuzz = lambda do |n|
  word = "#{'Fizz' if (n % 3).zero?}#{'Buzz' if (n % 5).zero?}"
  word.empty? ? n : word
end
expect(fizzbuzz.(9)).to eq('Fizz'), 'a multiple of 3'
expect(fizzbuzz.(10)).to eq('Buzz'), 'a multiple of 5'
expect(fizzbuzz.(30)).to eq('FizzBuzz'), 'a multiple of both'
expect(fizzbuzz.(7)).to eq(7), 'neither: the number itself'
expect((1..5).map(&fizzbuzz)).to eq([1, 2, 'Fizz', 4, 'Buzz']), 'the first five'
