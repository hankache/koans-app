# title: Big integers
# intro: Integers grow as large as they need to: there's no overflow. Underscores make long numbers easier to read.
expect(2 ** 100).to eq(___), 'no overflow'
expect(1_000_000).to eq(___), 'underscores are just for reading'
expect((2 ** 64).digits.size).to eq(___), 'digits lists the digits, last first'
expect(1234.digits).to eq(___), 'like this'
expect(0b1010).to eq(___), '0b is binary'
expect(0xff).to eq(___), '0x is hexadecimal'
expect(255.to_s(2)).to eq(___), 'to_s takes a base'
