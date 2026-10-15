def total(*nums) = nums.sum
expect(total(1, 2, 3)).to eq(6), '*nums gathers arguments'
expect(total(*[4, 5])).to eq(9), '* spreads an array into arguments'
def tag(name, **attrs)
  attrs.map { |k, v| "#{k}=#{v}" }.unshift(name).join(' ')
end
expect(tag('img', src: 'a.png', alt: 'A')).to eq('img src=a.png alt=A'), '**attrs gathers keywords'
options = { alt: 'B' }
expect(tag('img', **options)).to eq('img alt=B'), '** spreads a hash'
expect(method(:tag).arity).to eq(-2), 'a negative arity means optional extras'
