# title: Conversion
# intro: `to_i` and `to_f` read what they can and never fail. `Integer()` and `Float()` insist on a proper number, and raise otherwise.
expect('42'.to_i).to eq(___), 'to_i reads a number'
expect('42 apples'.to_i).to eq(___), 'as far as it can'
expect('apples'.to_i).to eq(___), 'and gives 0 when it cannot'
expect { Integer('42 apples') }.to raise_error(___), 'Integer() wants the whole string'
expect(Integer('0x1f', 16)).to eq(___), 'Integer() also takes a base'
expect(3.99.to_i).to eq(___), 'to_i on a float truncates'
expect(Float('1e3')).to eq(___), 'scientific notation'
