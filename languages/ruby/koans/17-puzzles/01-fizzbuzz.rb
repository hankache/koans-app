# title: FizzBuzz
# intro: The classic: count from 1, but say "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for both. Read this version and predict what it says.
fizzbuzz = lambda do |n|
  word = "#{'Fizz' if (n % 3).zero?}#{'Buzz' if (n % 5).zero?}"
  word.empty? ? n : word
end
expect(fizzbuzz.(9)).to eq(___), 'a multiple of 3'
expect(fizzbuzz.(10)).to eq(___), 'a multiple of 5'
expect(fizzbuzz.(30)).to eq(___), 'a multiple of both'
expect(fizzbuzz.(7)).to eq(___), 'neither: the number itself'
expect((1..5).map(&fizzbuzz)).to eq(___), 'the first five'
