ROMAN = { 1000 => 'M', 900 => 'CM', 500 => 'D', 400 => 'CD', 100 => 'C', 90 => 'XC', 50 => 'L', 40 => 'XL', 10 => 'X', 9 => 'IX', 5 => 'V', 4 => 'IV', 1 => 'I' }.freeze
def roman(number)
  ROMAN.reduce(+'') do |out, (value, symbol)|
    times, number = number.divmod(value)
    out << (symbol * times)
  end
end
expect(roman(3)).to eq('III'), 'the same symbol repeats'
expect(roman(4)).to eq('IV'), 'one before five'
expect(roman(14)).to eq('XIV'), 'ten, then four'
expect(roman(1994)).to eq('MCMXCIV'), 'a year'
expect(roman(0)).to eq(''), 'the Romans had no zero'
