# title: Splat arguments
# intro: `*args` gathers extra arguments into an array and `**opts` extra keywords into a hash; at a call, `*` and `**` spread them back out.
def total(*nums) = nums.sum
expect(total(1, 2, 3)).to eq(___), '*nums gathers arguments'
expect(total(*[4, 5])).to eq(___), '* spreads an array into arguments'
def tag(name, **attrs)
  attrs.map { |k, v| "#{k}=#{v}" }.unshift(name).join(' ')
end
expect(tag('img', src: 'a.png', alt: 'A')).to eq(___), '**attrs gathers keywords'
options = { alt: 'B' }
expect(tag('img', **options)).to eq(___), '** spreads a hash'
expect(method(:tag).arity).to eq(___), 'a negative arity means optional extras'
