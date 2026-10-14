# title: Lists
# intro: A list holds values in order and can change. `append` adds to its end and `pop` takes from it.
nums = [3, 1, 2]
nums.append(4)
assert nums == ___, 'append adds to the end'
assert len(nums) == ___, 'len counts the items'
assert nums.pop() == ___, 'pop removes and returns the last item'
assert nums.pop(0) == ___, 'or the item at a position'
assert nums + [9] == ___, '+ joins lists into a new one'
assert [0] * 3 == ___, '* repeats a list'
