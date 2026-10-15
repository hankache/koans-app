class Config
  def initialize(values) = @values = values

  def method_missing(name, *args)
    @values.key?(name) ? @values[name] : super
  end

  def respond_to_missing?(name, include_private = false) = @values.key?(name) || super
end
config = Config.new(host: 'localhost', port: 8080)
expect(config.port).to eq(8080), 'answered by method_missing'
expect(config.respond_to?(:host)).to eq(true), 'respond_to_missing? keeps respond_to? honest'
expect { config.user }.to raise_error(NoMethodError), 'super raises for the rest'
