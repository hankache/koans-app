nums = [3, 1, 2]
nums.append(4)
assert nums == [3, 1, 2, 4], 'append adds to the end'
assert len(nums) == 4, 'len counts the items'
assert nums.pop() == 4, 'pop removes and returns the last item'
assert nums.pop(0) == 3, 'or the item at a position'
assert nums + [9] == [1, 2, 9], '+ joins lists into a new one'
assert [0] * 3 == [0, 0, 0], '* repeats a list'
