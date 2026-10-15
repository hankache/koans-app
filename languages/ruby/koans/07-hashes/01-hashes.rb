# title: Hashes
# intro: A hash maps keys to values. `key: value` is short for a symbol key, `fetch` insists the key is there, and `dig` reaches into nested hashes.
h = { name: 'Ada', born: 1815 }
expect(h[:name]).to eq(___), 'look up by key'
expect(h[:missing]).to eq(___), 'a missing key gives nil'
expect { h.fetch(:missing) }.to raise_error(___), 'fetch raises instead'
expect(h.fetch(:missing, 'unknown')).to eq(___), 'unless given a default'
h[:field] = 'maths'
expect(h.keys).to eq(___), 'keys keep the order they were added'
expect({ 'a' => 1 }['a']).to eq(___), '=> for keys that are not symbols'
data = { user: { address: { city: 'London' } } }
expect(data.dig(:user, :address, :city)).to eq(___), 'dig reaches inside'
expect(h).to include(___), 'include checks pairs'
