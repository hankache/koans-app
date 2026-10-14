Point = Struct.new(:x, :y)
point = Point.new(1, 2)
assert_equal 1, point.x, 'a field'
assert_equal true, point == Point.new(1, 2), 'equal when their fields are equal'
point.x = 5
assert_equal [5, 2], point.to_a, 'Struct fields can change'
Coord = Data.define(:lat, :lng)
here = Coord.new(lat: 1, lng: 2)
assert_raises(NoMethodError) { here.lat = 3 }
moved = here.with(lat: 3)
assert_equal 3, moved.lat, 'with makes a changed copy'
assert_equal 1, here.lat, 'and leaves the original alone'
