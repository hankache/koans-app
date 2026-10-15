class Settings
  %i[volume brightness].each do |name|
    define_method(name) { instance_variable_get("@#{name}") || 0 }
    define_method("#{name}_up!") { instance_variable_set("@#{name}", public_send(name) + 1) }
  end
end
s = Settings.new
s.volume_up!
s.volume_up!
expect(s.volume).to eq(2), 'methods written by a loop'
expect(s.brightness).to eq(0), 'one for each name'
expect(Settings.instance_methods(false).sort).to eq([:brightness, :brightness_up!, :volume, :volume_up!]), 'all four'
