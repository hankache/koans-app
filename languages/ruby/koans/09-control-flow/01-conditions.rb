# title: Conditions
# intro: `if`, `unless`, the ternary operator and modifiers. In Ruby they are expressions: each returns a value.
temperature = 25
weather = if temperature > 20 then 'warm' else 'cold' end
expect(weather).to eq(___), 'if returns a value'
expect(temperature > 30 ? 'hot' : 'fine').to eq(___), 'the ternary operator'
message = 'stay in' unless temperature > 10
expect(message).to eq(___), 'unless as a modifier: it did not run'
result = (temperature if temperature < 0)
expect(result).to eq(___), 'an if that does not run gives nil'
