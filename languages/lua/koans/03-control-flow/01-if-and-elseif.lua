-- title: if and elseif
-- intro: `if … then … elseif … else … end` chooses. Lua has no `switch`; a chain of `elseif`, or a table of answers, does the job.
local function grade(score)
  if score >= 90 then
    return 'A'
  elseif score >= 75 then
    return 'B'
  else
    return 'C'
  end
end
assert.are.equal(___, grade(80), 'the first true branch runs')
assert.are.equal(___, grade(10), 'else when none is true')
local sounds = {cat = 'meow', dog = 'woof'}
local function speak(animal)
  return sounds[animal] or '...'
end
assert.are.equal(___, speak('dog'), 'a table can replace a switch')
assert.are.equal(___, speak('fish'), 'with or as the default')
