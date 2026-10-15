h = { name: 'Ada', born: 1815 }
expect(h[:name]).to eq('Ada'), 'look up by key'
expect(h[:missing]).to eq(nil), 'a missing key gives nil'
expect { h.fetch(:missing) }.to raise_error(KeyError), 'fetch raises instead'
expect(h.fetch(:missing, 'unknown')).to eq('unknown'), 'unless given a default'
h[:field] = 'maths'
expect(h.keys).to eq([:name, :born, :field]), 'keys keep the order they were added'
expect({ 'a' => 1 }['a']).to eq(1), '=> for keys that are not symbols'
data = { user: { address: { city: 'London' } } }
expect(data.dig(:user, :address, :city)).to eq('London'), 'dig reaches inside'
expect(h).to include(born: 1815), 'include checks pairs'
