package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSlices(t *testing.T) {
	var s []int
	assert.Equal(t, true, s == nil, "a slice starts as nil")
	assert.Equal(t, 0, len(s), "a nil slice has length 0")
	s = append(s, 1, 2, 3)
	assert.Equal(t, []int{1, 2, 3}, s, "append adds items")
	assert.Equal(t, 3, s[len(s)-1], "the last item is at len(s)-1")
	m := make([]int, 2, 10)
	assert.Equal(t, []int{0, 0}, m, "make sets the length...")
	assert.Equal(t, 10, cap(m), "...and the capacity")
}
