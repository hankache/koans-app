# title: Struct and Data
# intro: `Struct.new` makes a class with named fields that can change; `Data.define` makes one whose objects never change. `with` copies one with some fields replaced.
Point = Struct.new(:x, :y)
point = Point.new(1, 2)
assert_equal ___, point.x, 'a field'
assert_equal ___, point == Point.new(1, 2), 'equal when their fields are equal'
point.x = 5
assert_equal ___, point.to_a, 'Struct fields can change'
Coord = Data.define(:lat, :lng)
here = Coord.new(lat: 1, lng: 2)
assert_raises(___) { here.lat = 3 }
moved = here.with(lat: 3)
assert_equal ___, moved.lat, 'with makes a changed copy'
assert_equal ___, here.lat, 'and leaves the original alone'
