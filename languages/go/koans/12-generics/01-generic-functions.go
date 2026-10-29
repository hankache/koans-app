// title: Generic functions
// intro: A function can take type parameters, in square brackets: `func Map[T, U any](s []T, f func(T) U) []U`. Go usually infers them from the arguments.
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
	assert.Equal(t, ___, doubled, "T and U are both int here")
	assert.Equal(t, ___, Map([]int{1, 2}, strconv.Itoa), "U is inferred as string")
	even := Filter([]int{1, 2, 3, 4}, func(n int) bool { return n%2 == 0 })
	assert.Equal(t, ___, even, "the same Filter works for any type")
	halves := Map[int, float64]([]int{1}, func(n int) float64 { return float64(n) / 2 })
	assert.Equal(t, ___, halves, "type arguments can be given explicitly")
}
