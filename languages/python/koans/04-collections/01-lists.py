# title: Lists
# intro: A list holds values in order and can change. `sorted()` returns a new sorted list; the `.sort()` method sorts the list itself.
nums = [3, 1, 2]
nums.append(4)
assert_equal(nums, ___, 'append adds to the end')
assert_equal(len(nums), ___, 'len counts the items')
assert_equal(nums.pop(), ___, 'pop removes and returns the last item')
assert_equal(sorted(nums), ___, 'sorted returns a new list')
assert_equal(nums, ___, 'and leaves the old one alone')
nums.sort()
assert_equal(nums, ___, 'sort changes the list itself')
assert_equal(nums + [4, 5], ___, '+ joins lists')
