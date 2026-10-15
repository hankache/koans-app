-- title: Comparing floats
-- intro: Floats rarely come out exact, so busted compares them with `assert.are.near(expected, actual, tolerance)`. Integer and float zero, and positive and negative zero, are all equal.
assert.are.near(___, 0.1 + 0.2, 1e-9, 'near allows a small difference')
assert.are.near(___, math.sqrt(2), 0.001, 'to whatever tolerance you choose')
assert.are.equal(___, 0 == -0.0, 'zero and negative zero are equal')
assert.are.equal(___, tostring(1 / -0.0), 'but dividing by them is not the same')
assert.are.equal(___, (0 / 0) ~= (0 / 0), 'not a number is not equal to itself')
assert.are.equal(___, math.fmod(-7, 3), 'fmod keeps the sign of the number divided, unlike %')
