// title: Named results and variadic functions
// intro: Results can be named: they start at their zero values, and a bare `return` returns them. A last parameter `...T` takes any number of arguments as a slice, and `s...` passes a slice's items. `min` and `max` are built in.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func minMax(xs []int) (lo, hi int) {
	lo, hi = xs[0], xs[0]
	for _, x := range xs {
		lo = min(lo, x)
		hi = max(hi, x)
	}
	return
}

func sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}

func TestNamedResultsAndVariadic(t *testing.T) {
	lo, hi := minMax([]int{3, 9, 1})
	assert.Equal(t, ___, lo, "min keeps the smaller")
	assert.Equal(t, ___, hi, "a bare return returns the named results")
	assert.Equal(t, ___, sum(), "no arguments: an empty slice")
	assert.Equal(t, ___, sum(1, 2, 3), "any number of arguments")
	nums := []int{4, 5}
	assert.Equal(t, ___, sum(nums...), "... passes a slice's items")
	assert.Equal(t, ___, min(7, 2, 5), "min takes any number of arguments")
}
