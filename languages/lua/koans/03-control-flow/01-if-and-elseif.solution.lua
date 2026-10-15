local function grade(score)
  if score >= 90 then
    return 'A'
  elseif score >= 75 then
    return 'B'
  else
    return 'C'
  end
end
assert.are.equal('B', grade(80), 'the first true branch runs')
assert.are.equal('C', grade(10), 'else when none is true')
local sounds = {cat = 'meow', dog = 'woof'}
local function speak(animal)
  return sounds[animal] or '...'
end
assert.are.equal('woof', speak('dog'), 'a table can replace a switch')
assert.are.equal('...', speak('fish'), 'with or as the default')
