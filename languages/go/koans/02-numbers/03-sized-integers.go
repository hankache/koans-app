// title: Sized integers
// intro: Besides `int`, Go has sized integers, from `int8` to `int64` and `uint8` to `uint64`. Arithmetic on them wraps around at their limits, which the `math` package names. Mixing two integer types needs a conversion.
package koans

import (
	"math"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSizedIntegers(t *testing.T) {
	assert.Equal(t, ___, math.MaxInt8, "an int8 holds up to 127")
	var small int8 = 127
	small++
	assert.Equal(t, ___, small, "past its maximum, an integer wraps around")
	var u uint8
	u--
	assert.Equal(t, ___, u, "an unsigned integer wraps the other way")
	var b byte = 'a'
	assert.Equal(t, ___, b, "byte is another name for uint8")
	var i32 int32 = 5
	var i64 int64 = 7
	assert.Equal(t, ___, int64(i32)+i64, "different integer types must be converted to mix")
}
