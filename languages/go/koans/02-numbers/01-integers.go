// title: Integers
// intro: `/` between integers drops the remainder, rounding toward zero, and `%` gives the remainder, with the sign of the number divided. `0x` starts a hexadecimal number and `0b` a binary one.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestIntegers(t *testing.T) {
	assert.Equal(t, ___, 17/5, "/ drops the remainder")
	assert.Equal(t, ___, 17%5, "% is the remainder")
	assert.Equal(t, ___, -7/2, "/ rounds toward zero")
	assert.Equal(t, ___, -7%2, "% takes the sign of the number divided")
	n := 10
	n += 5
	n++
	assert.Equal(t, ___, n, "+= and ++ change a variable")
	assert.Equal(t, ___, 0xff, "0x starts a hexadecimal number")
	assert.Equal(t, ___, 0b1000, "0b starts a binary number")
}
