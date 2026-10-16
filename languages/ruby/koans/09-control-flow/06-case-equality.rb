# title: Case equality
# intro: `case` compares with `===`, and each kind of object answers it its own way: a class asks "are you one of mine?", a range "are you inside me?", a regexp "do you match me?".
expect(Integer === 3).to eq(___), 'a class checks the kind'
expect((1..5) === 3).to eq(___), 'a range checks membership'
expect(/ab/ === 'cab').to eq(___), 'a regexp checks for a match'
expect(->(n) { n.even? } === 4).to eq(___), 'a lambda calls itself'
expect(3 === Integer).to eq(___), 'so === is not symmetric'
category =
  case 42.0
  when Integer then 'integer'
  when Numeric then 'number'
  else 'other'
  end
expect(category).to eq(___), 'case tries === on each when'
