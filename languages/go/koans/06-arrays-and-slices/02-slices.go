// title: Slices
// intro: A slice is a view of an array, with a length and a capacity. `append` adds items, moving to a bigger array when the capacity runs out, and returns the new slice. `make([]T, len, cap)` makes one of a given size.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSlices(t *testing.T) {
	var s []int
	assert.Equal(t, ___, s == nil, "a slice starts as nil")
	assert.Equal(t, ___, len(s), "a nil slice has length 0")
	s = append(s, 1, 2, 3)
	assert.Equal(t, ___, s, "append adds items")
	assert.Equal(t, ___, s[len(s)-1], "the last item is at len(s)-1")
	m := make([]int, 2, 10)
	assert.Equal(t, ___, m, "make sets the length...")
	assert.Equal(t, ___, cap(m), "...and the capacity")
}
