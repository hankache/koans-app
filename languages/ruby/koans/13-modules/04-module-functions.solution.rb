module Units
  module_function

  def km_to_miles(km) = (km * 0.621371).round(2)
end
expect(Units.km_to_miles(10)).to eq(6.21), 'called on the module'
expect(Math.sqrt(16)).to eq(4.0), 'Math works the same way'
expect(Math::PI.round(2)).to eq(3.14), 'and has constants'
module Text
  extend self

  def shout(s) = s.upcase
end
expect(Text.shout('hey')).to eq('HEY'), 'extend self'
