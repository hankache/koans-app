// title: Floats
// intro: `float64` is Go's usual floating-point type, and the `math` package has the functions for it. Floats round in binary: `0.1 + 0.2` isn't exactly `0.3`, so compare them with a tolerance.
package koans

import (
	"math"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFloats(t *testing.T) {
	assert.Equal(t, ___, math.Sqrt(9), "math.Sqrt is the square root")
	assert.Equal(t, ___, math.Floor(2.7), "Floor rounds down")
	assert.Equal(t, ___, math.Round(-2.5), "Round rounds halves away from zero")
	a, b := 0.1, 0.2
	assert.Equal(t, ___, a+b == 0.3, "0.1 + 0.2 is not exactly 0.3")
	assert.InDelta(t, ___, a+b, 1e-9, "InDelta allows a small difference")
	zero := 0.0
	assert.Equal(t, ___, 1/zero, "a float divided by zero is infinity")
}
