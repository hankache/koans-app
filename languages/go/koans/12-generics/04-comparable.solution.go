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
	assert.Equal(t, 2, Count([]string{"a", "b", "a"})["a"], "Count works for strings")
	assert.Equal(t, []int{3, 1, 2}, Unique([]int{3, 1, 3, 2, 1}), "Unique keeps first appearances, in order")
	assert.Equal(t, 2, len(Unique([]point{{1, 2}, {3, 4}, {1, 2}})), "a struct is comparable when its fields are")
	assert.Equal(t, []string{"a", "b", "a"}, slices.Compact([]string{"a", "a", "b", "a"}), "slices.Compact removes repeats that are next to each other")
}
