# title: String methods
# intro: Strings come with many methods. Most return a new string; `sub` changes the first match and `gsub` every one.
assert_equal ___, 'hello'.upcase, 'upper case'
assert_equal ___, 'hello world'.capitalize, 'a capital at the start'
assert_equal ___, 'stressed'.reverse, 'reversed'
assert_equal ___, 'koan'.include?('oa'), 'include? looks for a substring'
assert_equal ___, 'a-b-c'.sub('-', '+'), 'sub replaces the first match'
assert_equal ___, 'a-b-c'.gsub('-', '+'), 'gsub replaces them all'
assert_equal ___, '  pad  '.strip, 'strip removes the spaces around'
