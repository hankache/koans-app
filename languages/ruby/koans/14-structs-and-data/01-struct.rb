# title: Struct
# intro: `Struct.new` writes a class with accessors, `==` by value, and a readable `inspect`, from a list of field names.
Point = Struct.new(:x, :y) do
  def distance_to(other) = Math.hypot(x - other.x, y - other.y)
end
a = Point.new(0, 0)
b = Point.new(3, 4)
expect(a.distance_to(b)).to eq(___), 'methods can be added'
expect(Point.new(1, 2) == Point.new(1, 2)).to eq(___), 'equal by value'
b.x = 6
expect(b.to_a).to eq(___), 'fields can change, and convert to an array'
expect(Point.new(1).y).to eq(___), 'missing fields are nil'
x, y = *Point.new(7, 8)
expect(y).to eq(___), 'and a struct splats like an array'
