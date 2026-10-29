// title: Arrays
// intro: An array has a fixed length, which is part of its type: `[3]int`. Arrays are values: assigning or passing one copies all its items.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestArrays(t *testing.T) {
	var a [3]int
	assert.Equal(t, ___, a, "an array starts with zero values")
	b := [...]string{"x", "y"}
	assert.Equal(t, ___, len(b), "[...] counts the items for you")
	c := a
	c[0] = 9
	assert.Equal(t, ___, a[0], "assigning an array copies it")
	assert.Equal(t, ___, [2]int{1, 2} == [2]int{1, 2}, "arrays compare with ==")
}
