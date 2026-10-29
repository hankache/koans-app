package koans

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestConversions(t *testing.T) {
	n := 7
	f := float64(n) / 2
	assert.Equal(t, 3.5, f, "convert first, then divide")
	assert.Equal(t, 3, int(f), "converting to an int drops the fraction")
	g := -3.9
	assert.Equal(t, -3, int(g), "toward zero, for negative numbers too")
	assert.Equal(t, "int", fmt.Sprintf("%T", n), "%T names the type")
	assert.Equal(t, "float64", fmt.Sprintf("%T", 2.5), "a number with a point is a float64 by default")
	assert.Equal(t, "int32", fmt.Sprintf("%T", 'A'), "a character in single quotes is a rune, which is an int32")
	assert.Equal(t, "A", string(rune(65)), "a rune converts to the string of its character")
}
