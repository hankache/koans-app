# title: Objects
# intro: Everything in Ruby is an object, numbers included: everything has a class and answers methods. `respond_to?` asks whether an object has a method.
assert_equal ___, 42.class, 'numbers are objects'
assert_equal ___, 'hi'.class, 'so are strings'
assert_equal ___, String.class, 'and classes themselves'
assert_equal ___, 42.respond_to?(:+), '+ is a method'
assert_equal ___, 1.+(2), 'which you can call like any other'
assert_equal ___, 42.frozen?, 'some objects can never change'
