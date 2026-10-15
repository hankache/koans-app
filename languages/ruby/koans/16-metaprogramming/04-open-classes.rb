# title: Open classes
# intro: Classes are never closed: reopening one adds or replaces methods, even on built-in classes. Use it sparingly; refinements limit the change to where it's turned on.
class String
  def shout = upcase + '!'
end
expect('hey'.shout).to eq(___), 'a new method on every string'
module Percent
  refine Numeric do
    def percent_of(total) = self * total / 100.0
  end
end
using Percent
expect(25.percent_of(80)).to eq(___), 'a refinement, turned on with using'
expect(String.method_defined?(:shout)).to eq(___), 'the reopened class really changed'
