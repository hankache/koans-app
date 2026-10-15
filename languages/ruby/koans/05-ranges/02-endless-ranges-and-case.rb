# title: Endless ranges and case
# intro: A range can leave out an end: `(18..)` means "18 or more". Ranges work in `case`/`when` and in slicing.
def ticket(age)
  case age
  when ...13 then 'child'
  when 13..17 then 'teen'
  when 18.. then 'adult'
  end
end
expect(ticket(9)).to eq(___), 'a beginless range'
expect(ticket(30)).to eq(___), 'an endless range'
expect([10, 20, 30, 40][1..]).to eq(___), 'slicing to the end'
expect((1..).first(3)).to eq(___), 'take from an endless range'
expect((1..10) === 5).to eq(___), 'case uses ==='
