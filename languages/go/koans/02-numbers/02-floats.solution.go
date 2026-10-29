package koans

import (
	"math"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFloats(t *testing.T) {
	assert.Equal(t, 3.0, math.Sqrt(9), "math.Sqrt is the square root")
	assert.Equal(t, 2.0, math.Floor(2.7), "Floor rounds down")
	assert.Equal(t, -3.0, math.Round(-2.5), "Round rounds halves away from zero")
	a, b := 0.1, 0.2
	assert.Equal(t, false, a+b == 0.3, "0.1 + 0.2 is not exactly 0.3")
	assert.InDelta(t, 0.3, a+b, 1e-9, "InDelta allows a small difference")
	zero := 0.0
	assert.Equal(t, math.Inf(1), 1/zero, "a float divided by zero is infinity")
}
