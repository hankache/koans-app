Point = Struct.new(:x, :y) do
  def distance_to(other) = Math.hypot(x - other.x, y - other.y)
end
a = Point.new(0, 0)
b = Point.new(3, 4)
expect(a.distance_to(b)).to eq(5.0), 'methods can be added'
expect(Point.new(1, 2) == Point.new(1, 2)).to eq(true), 'equal by value'
b.x = 6
expect(b.to_a).to eq([6, 4]), 'fields can change, and convert to an array'
expect(Point.new(1).y).to eq(nil), 'missing fields are nil'
x, y = *Point.new(7, 8)
expect(y).to eq(8), 'and a struct splats like an array'
