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
	assert.Equal(t, 1, lo, "min keeps the smaller")
	assert.Equal(t, 9, hi, "a bare return returns the named results")
	assert.Equal(t, 0, sum(), "no arguments: an empty slice")
	assert.Equal(t, 6, sum(1, 2, 3), "any number of arguments")
	nums := []int{4, 5}
	assert.Equal(t, 9, sum(nums...), "... passes a slice's items")
	assert.Equal(t, 2, min(7, 2, 5), "min takes any number of arguments")
}
