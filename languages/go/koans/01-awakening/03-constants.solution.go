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
	assert.Equal(t, 1, Monday, "iota counts the lines of its block")
	assert.Equal(t, 2, Tuesday, "a line without a value repeats the one above, with the next iota")
	assert.Equal(t, 1024, KB, "iota can be part of an expression")
	assert.Equal(t, 1048576, MB, "the expression repeats too")
	const big = 1 << 100
	assert.Equal(t, 4, big>>98, "an untyped constant can be bigger than any integer type")
	var f float64 = 1 / 2
	assert.Equal(t, 0.0, f, "1 / 2 divides two integers before the result becomes a float64")
}
