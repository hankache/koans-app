# title: Comparison
# intro: `<=>`, the spaceship, answers -1, 0 or 1. Every comparison builds on it, as do `between?`, `clamp`, `max` and `minmax`.
assert_equal ___, 1 <=> 2, 'less'
assert_equal ___, 'b' <=> 'a', 'greater'
assert_equal ___, 3 <=> 3, 'equal'
assert_equal ___, 5.between?(1, 10), 'between? includes both ends'
assert_equal ___, 15.clamp(1, 10), 'clamp keeps a value within bounds'
assert_equal ___, [3, 1, 2].minmax, 'minmax gives both ends at once'
