package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestArrays(t *testing.T) {
	var a [3]int
	assert.Equal(t, [3]int{0, 0, 0}, a, "an array starts with zero values")
	b := [...]string{"x", "y"}
	assert.Equal(t, 2, len(b), "[...] counts the items for you")
	c := a
	c[0] = 9
	assert.Equal(t, 0, a[0], "assigning an array copies it")
	assert.Equal(t, true, [2]int{1, 2} == [2]int{1, 2}, "arrays compare with ==")
}
