# title: Module functions
# intro: A module can hold functions of its own, called on the module, like `Math.sqrt`. `module_function` makes them, and `extend self` is another way.
module Units
  module_function

  def km_to_miles(km) = (km * 0.621371).round(2)
end
expect(Units.km_to_miles(10)).to eq(___), 'called on the module'
expect(Math.sqrt(16)).to eq(___), 'Math works the same way'
expect(Math::PI.round(2)).to eq(___), 'and has constants'
module Text
  extend self

  def shout(s) = s.upcase
end
expect(Text.shout('hey')).to eq(___), 'extend self'
