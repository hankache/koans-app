# title: define_method
# intro: `define_method` writes methods at run time, from a name and a block, which is how `attr_accessor` and friends could be built.
class Settings
  %i[volume brightness].each do |name|
    define_method(name) { instance_variable_get("@#{name}") || 0 }
    define_method("#{name}_up!") { instance_variable_set("@#{name}", public_send(name) + 1) }
  end
end
s = Settings.new
s.volume_up!
s.volume_up!
expect(s.volume).to eq(___), 'methods written by a loop'
expect(s.brightness).to eq(___), 'one for each name'
expect(Settings.instance_methods(false).sort).to eq(___), 'all four'
