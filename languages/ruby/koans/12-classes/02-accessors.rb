# title: Accessors
# intro: `attr_reader`, `attr_writer` and `attr_accessor` write the methods that read and set instance variables.
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
expect(fern.height).to eq(___), 'height= is a method; self. is needed inside to call it'
expect(fern.respond_to?(:name=)).to eq(___), 'attr_reader writes no setter'
expect(fern).to have_attributes(name: 'fern', height: ___), 'have_attributes checks several'
