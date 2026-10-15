# title: The exception hierarchy
# intro: Exceptions are classes. `rescue` with no class catches `StandardError` and its subclasses, which is nearly every error a program makes.
expect(ZeroDivisionError.ancestors.take(3)).to eq(___), 'a family tree'
expect(KeyError.superclass).to eq(___), 'KeyError is a kind of IndexError'
caught = begin
  {}.fetch(:x)
rescue IndexError => e
  e.class
end
expect(caught).to eq(___), 'so rescuing IndexError catches it'
expect { raise 'plain' }.to raise_error(___), 'raise_error accepts a parent class'
