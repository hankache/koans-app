// title: Comparable
// intro: The constraint `comparable` allows the types that work with `==`, which map keys need. With it, one function can count or remove duplicates of any such type.
package koans

import (
	"slices"
	"testing"

	"github.com/stretchr/testify/assert"
)

func Count[T comparable](xs []T) map[T]int {
	counts := map[T]int{}
	for _, x := range xs {
		counts[x]++
	}
	return counts
}

func Unique[T comparable](xs []T) []T {
	seen := map[T]bool{}
	var out []T
	for _, x := range xs {
		if !seen[x] {
			seen[x] = true
			out = append(out, x)
		}
	}
	return out
}

type point struct{ X, Y int }

func TestComparable(t *testing.T) {
	assert.Equal(t, ___, Count([]string{"a", "b", "a"})["a"], "Count works for strings")
	assert.Equal(t, ___, Unique([]int{3, 1, 3, 2, 1}), "Unique keeps first appearances, in order")
	assert.Equal(t, ___, len(Unique([]point{{1, 2}, {3, 4}, {1, 2}})), "a struct is comparable when its fields are")
	assert.Equal(t, ___, slices.Compact([]string{"a", "a", "b", "a"}), "slices.Compact removes repeats that are next to each other")
}
