class String
  def shout = upcase + '!'
end
expect('hey'.shout).to eq('HEY!'), 'a new method on every string'
module Percent
  refine Numeric do
    def percent_of(total) = self * total / 100.0
  end
end
using Percent
expect(25.percent_of(80)).to eq(20.0), 'a refinement, turned on with using'
expect(String.method_defined?(:shout)).to eq(true), 'the reopened class really changed'
