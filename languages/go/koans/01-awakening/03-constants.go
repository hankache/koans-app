// title: Constants and iota
// intro: `const` names a value fixed when the program is compiled. A constant without a type is untyped: it takes the type its use needs. In a `const` block, `iota` counts the lines from 0, and a line without a value repeats the expression above it.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

const (
	Sunday = iota
	Monday
	Tuesday
)

const (
	_  = iota
	KB = 1 << (10 * iota)
	MB
)

func TestConstants(t *testing.T) {
	assert.Equal(t, ___, Monday, "iota counts the lines of its block")
	assert.Equal(t, ___, Tuesday, "a line without a value repeats the one above, with the next iota")
	assert.Equal(t, ___, KB, "iota can be part of an expression")
	assert.Equal(t, ___, MB, "the expression repeats too")
	const big = 1 << 100
	assert.Equal(t, ___, big>>98, "an untyped constant can be bigger than any integer type")
	var f float64 = 1 / 2
	assert.Equal(t, ___, f, "1 / 2 divides two integers before the result becomes a float64")
}
