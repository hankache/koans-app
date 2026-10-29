package koans

import (
	"strconv"
	"testing"

	"github.com/stretchr/testify/assert"
)

func Map[T, U any](s []T, f func(T) U) []U {
	out := make([]U, 0, len(s))
	for _, v := range s {
		out = append(out, f(v))
	}
	return out
}

func Filter[T any](s []T, keep func(T) bool) []T {
	var out []T
	for _, v := range s {
		if keep(v) {
			out = append(out, v)
		}
	}
	return out
}

func TestGenericFunctions(t *testing.T) {
	doubled := Map([]int{1, 2, 3}, func(n int) int { return n * 2 })
	assert.Equal(t, []int{2, 4, 6}, doubled, "T and U are both int here")
	assert.Equal(t, []string{"1", "2"}, Map([]int{1, 2}, strconv.Itoa), "U is inferred as string")
	even := Filter([]int{1, 2, 3, 4}, func(n int) bool { return n%2 == 0 })
	assert.Equal(t, []int{2, 4}, even, "the same Filter works for any type")
	halves := Map[int, float64]([]int{1}, func(n int) float64 { return float64(n) / 2 })
	assert.Equal(t, []float64{0.5}, halves, "type arguments can be given explicitly")
}
