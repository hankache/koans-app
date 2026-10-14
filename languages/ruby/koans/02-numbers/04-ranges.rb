# title: Ranges
# intro: `1..5` includes its end, `1...5` stops before it. Ranges can be turned into arrays, stepped through, and asked what they include.
assert_equal ___, (1..5).to_a, 'two dots include the end'
assert_equal ___, (1...5).to_a, 'three dots leave it out'
assert_equal ___, (1..10).include?(10), 'include? asks about a value'
assert_equal ___, (1..10).step(3).to_a, 'step skips along'
assert_equal ___, (1..100).sum, 'ranges have sum, like arrays'
assert_equal ___, ('a'..'e').to_a.join, 'letters make ranges too'
