# title: case and when
# intro: `case` compares with `===`, so `when` can test against values, ranges, classes, patterns, or lambdas.
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
expect(describe(0)).to eq(___), 'a value'
expect(describe(7)).to eq(___), 'a class'
expect(describe('42')).to eq(___), 'a pattern'
expect(describe(:sym)).to eq(___), 'one of several'
expect(describe([1])).to eq(___), 'a lambda'
expect(describe(1.5)).to eq(___), 'else'
