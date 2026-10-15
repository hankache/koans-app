# title: method_missing
# intro: When no method matches, Ruby calls `method_missing`. Overriding it, together with `respond_to_missing?`, lets an object answer messages it never defined.
class Config
  def initialize(values) = @values = values

  def method_missing(name, *args)
    @values.key?(name) ? @values[name] : super
  end

  def respond_to_missing?(name, include_private = false) = @values.key?(name) || super
end
config = Config.new(host: 'localhost', port: 8080)
expect(config.port).to eq(___), 'answered by method_missing'
expect(config.respond_to?(:host)).to eq(___), 'respond_to_missing? keeps respond_to? honest'
expect { config.user }.to raise_error(___), 'super raises for the rest'
