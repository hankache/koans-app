// title: Sequences
// intro: The `iter` package names these functions' types: an `iter.Seq[V]` yields values, an `iter.Seq2[K, V]` pairs. `slices.All`, `slices.Backward` and `maps.Keys` return sequences, and `slices.Collect` gathers one into a slice.
package koans

import (
	"fmt"
	"iter"
	"maps"
	"slices"
	"testing"

	"github.com/stretchr/testify/assert"
)

func Evens(limit int) iter.Seq[int] {
	return func(yield func(int) bool) {
		for i := 0; i < limit; i += 2 {
			if !yield(i) {
				return
			}
		}
	}
}

func TestSequences(t *testing.T) {
	assert.Equal(t, ___, slices.Collect(Evens(6)), "Collect gathers a sequence into a slice")
	var pairs []string
	for i, s := range slices.All([]string{"a", "b"}) {
		pairs = append(pairs, fmt.Sprintf("%d:%s", i, s))
	}
	assert.Equal(t, ___, pairs, "slices.All yields index and value")
	var back []int
	for _, v := range slices.Backward([]int{1, 2, 3}) {
		back = append(back, v)
	}
	assert.Equal(t, ___, back, "slices.Backward starts from the end")
	keys := slices.Sorted(maps.Keys(map[string]int{"y": 1, "x": 2}))
	assert.Equal(t, ___, keys, "slices.Sorted collects a sequence and sorts it")
}
