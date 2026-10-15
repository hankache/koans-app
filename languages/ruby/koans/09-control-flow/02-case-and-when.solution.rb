def describe(x)
  case x
  when 0 then 'zero'
  when Integer then 'an integer'
  when /^\d+$/ then 'digits'
  when String, Symbol then 'text'
  when ->(v) { v.respond_to?(:each) } then 'a collection'
  else 'something else'
  end
end
expect(describe(0)).to eq('zero'), 'a value'
expect(describe(7)).to eq('an integer'), 'a class'
expect(describe('42')).to eq('digits'), 'a pattern'
expect(describe(:sym)).to eq('text'), 'one of several'
expect(describe([1])).to eq('a collection'), 'a lambda'
expect(describe(1.5)).to eq('something else'), 'else'
