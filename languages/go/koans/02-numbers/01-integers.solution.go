package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestIntegers(t *testing.T) {
	assert.Equal(t, 3, 17/5, "/ drops the remainder")
	assert.Equal(t, 2, 17%5, "% is the remainder")
	assert.Equal(t, -3, -7/2, "/ rounds toward zero")
	assert.Equal(t, -1, -7%2, "% takes the sign of the number divided")
	n := 10
	n += 5
	n++
	assert.Equal(t, 16, n, "+= and ++ change a variable")
	assert.Equal(t, 255, 0xff, "0x starts a hexadecimal number")
	assert.Equal(t, 8, 0b1000, "0b starts a binary number")
}
