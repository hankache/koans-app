package koans

import (
	"iter"
	"slices"
	"testing"

	"github.com/stretchr/testify/assert"
)

func Naturals() iter.Seq[int] {
	return func(yield func(int) bool) {
		for i := 1; ; i++ {
			if !yield(i) {
				return
			}
		}
	}
}

func Filter[V any](seq iter.Seq[V], keep func(V) bool) iter.Seq[V] {
	return func(yield func(V) bool) {
		for v := range seq {
			if keep(v) && !yield(v) {
				return
			}
		}
	}
}

func Take[V any](seq iter.Seq[V], n int) iter.Seq[V] {
	return func(yield func(V) bool) {
		if n <= 0 {
			return
		}
		i := 0
		for v := range seq {
			if !yield(v) {
				return
			}
			i++
			if i == n {
				return
			}
		}
	}
}

func TestLazySequences(t *testing.T) {
	odd := Filter(Naturals(), func(n int) bool { return n%2 == 1 })
	assert.Equal(t, []int{1, 3, 5}, slices.Collect(Take(odd, 3)), "an endless sequence is fine, if something stops it")
	calls := 0
	big := Filter(slices.Values([]int{1, 2, 3, 4, 5}), func(n int) bool {
		calls++
		return n > 1
	})
	for range big {
		break
	}
	assert.Equal(t, 2, calls, "values are made only as the loop asks: it stopped after the first one kept")
}
