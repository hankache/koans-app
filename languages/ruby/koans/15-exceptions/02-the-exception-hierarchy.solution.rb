expect(ZeroDivisionError.ancestors.take(3)).to eq([ZeroDivisionError, StandardError, Exception]), 'a family tree'
expect(KeyError.superclass).to eq(IndexError), 'KeyError is a kind of IndexError'
caught = begin
  {}.fetch(:x)
rescue IndexError => e
  e.class
end
expect(caught).to eq(KeyError), 'so rescuing IndexError catches it'
expect { raise 'plain' }.to raise_error(StandardError), 'raise_error accepts a parent class'
