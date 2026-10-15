# title: Everything is an object
# intro: Numbers, strings, `nil`, even classes: every value in Ruby is an object, with a class and methods you can call.
expect(42.class).to eq(___), 'a number is an object'
expect(42.even?).to eq(___), 'with methods'
expect(-5.abs).to eq(___), 'even a negative one'
expect(String.class).to eq(___), 'classes are objects too'
expect(3.14).to be_a(___), 'be_a checks the class'
expect(1.0).to be_a(___), 'or one of its ancestors'
expect(7.respond_to?(:+)).to eq(___), 'operators are methods: 7.+(1)'
expect(7.+(1)).to eq(___), 'called the long way'
