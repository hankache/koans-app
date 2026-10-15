class Plant
  attr_reader :name
  attr_accessor :height

  def initialize(name)
    @name = name
    @height = 0
  end

  def grow!(cm) = self.height += cm
end
fern = Plant.new('fern')
fern.height = 10
fern.grow!(5)
expect(fern.height).to eq(15), 'height= is a method; self. is needed inside to call it'
expect(fern.respond_to?(:name=)).to eq(false), 'attr_reader writes no setter'
expect(fern).to have_attributes(name: 'fern', height: 15), 'have_attributes checks several'
