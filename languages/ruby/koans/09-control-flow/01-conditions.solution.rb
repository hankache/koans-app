temperature = 25
weather = if temperature > 20 then 'warm' else 'cold' end
expect(weather).to eq('warm'), 'if returns a value'
expect(temperature > 30 ? 'hot' : 'fine').to eq('fine'), 'the ternary operator'
message = 'stay in' unless temperature > 10
expect(message).to eq(nil), 'unless as a modifier: it did not run'
result = (temperature if temperature < 0)
expect(result).to eq(nil), 'an if that does not run gives nil'
