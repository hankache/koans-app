def ticket(age)
  case age
  when ...13 then 'child'
  when 13..17 then 'teen'
  when 18.. then 'adult'
  end
end
expect(ticket(9)).to eq('child'), 'a beginless range'
expect(ticket(30)).to eq('adult'), 'an endless range'
expect([10, 20, 30, 40][1..]).to eq([20, 30, 40]), 'slicing to the end'
expect((1..).first(3)).to eq([1, 2, 3]), 'take from an endless range'
expect((1..10) === 5).to eq(true), 'case uses ==='
