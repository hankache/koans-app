expect(Integer === 3).to eq(true), 'a class checks the kind'
expect((1..5) === 3).to eq(true), 'a range checks membership'
expect(/ab/ === 'cab').to eq(true), 'a regexp checks for a match'
expect(->(n) { n.even? } === 4).to eq(true), 'a lambda calls itself'
expect(3 === Integer).to eq(false), 'so === is not symmetric'
category =
  case 42.0
  when Integer then 'integer'
  when Numeric then 'number'
  else 'other'
  end
expect(category).to eq('number'), 'case tries === on each when'
