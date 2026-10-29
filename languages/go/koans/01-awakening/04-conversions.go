// title: Types and conversions
// intro: Go never converts between types for you: `float64(n)` converts explicitly. Converting a float to an integer drops the fraction. In `fmt.Sprintf`, the verb `%T` names a value's type.
package koans

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestConversions(t *testing.T) {
	n := 7
	f := float64(n) / 2
	assert.Equal(t, ___, f, "convert first, then divide")
	assert.Equal(t, ___, int(f), "converting to an int drops the fraction")
	g := -3.9
	assert.Equal(t, ___, int(g), "toward zero, for negative numbers too")
	assert.Equal(t, ___, fmt.Sprintf("%T", n), "%T names the type")
	assert.Equal(t, ___, fmt.Sprintf("%T", 2.5), "a number with a point is a float64 by default")
	assert.Equal(t, ___, fmt.Sprintf("%T", 'A'), "a character in single quotes is a rune, which is an int32")
	assert.Equal(t, ___, string(rune(65)), "a rune converts to the string of its character")
}
