package koans

import (
	"math"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSizedIntegers(t *testing.T) {
	assert.Equal(t, 127, math.MaxInt8, "an int8 holds up to 127")
	var small int8 = 127
	small++
	assert.Equal(t, -128, small, "past its maximum, an integer wraps around")
	var u uint8
	u--
	assert.Equal(t, 255, u, "an unsigned integer wraps the other way")
	var b byte = 'a'
	assert.Equal(t, 97, b, "byte is another name for uint8")
	var i32 int32 = 5
	var i64 int64 = 7
	assert.Equal(t, 12, int64(i32)+i64, "different integer types must be converted to mix")
}
