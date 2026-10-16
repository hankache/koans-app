# title: heapq and bisect
# intro: `heapq` keeps a list as a heap, with the smallest item always first. `bisect` finds where a value belongs in a sorted list, and `insort` puts it there.
import bisect
import heapq

nums = [5, 1, 8, 3]
heapq.heapify(nums)
assert nums[0] == ___, 'a heap keeps its smallest first'
heapq.heappush(nums, 0)
assert heapq.heappop(nums) == ___, 'heappop takes the smallest'
assert heapq.nsmallest(2, [7, 2, 9, 4]) == ___, 'nsmallest, without sorting everything'
assert heapq.nlargest(1, ['pear', 'fig', 'banana'], key=len) == ___, 'nlargest, with a key'
scores = [10, 20, 30]
assert bisect.bisect(scores, 25) == ___, 'bisect finds where a value would go'
bisect.insort(scores, 15)
assert scores == ___, 'insort keeps the list sorted'
