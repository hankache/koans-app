package koans

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

type point struct{ X, Y int }

func TestFormatting(t *testing.T) {
	assert.Equal(t, "7 apples", fmt.Sprintf("%d %s", 7, "apples"), "%d and %s")
	assert.Equal(t, `"go"`, fmt.Sprintf("%q", "go"), "%q quotes")
	assert.Equal(t, "3.14", fmt.Sprintf("%.2f", 3.14159), "%.2f keeps two decimals")
	assert.Equal(t, "   42", fmt.Sprintf("%5d", 42), "%5d pads to five characters")
	assert.Equal(t, "ff", fmt.Sprintf("%x", 255), "%x is hexadecimal")
	assert.Equal(t, "{1 2}", fmt.Sprintf("%v", point{1, 2}), "%v shows any value")
	assert.Equal(t, "{X:1 Y:2}", fmt.Sprintf("%+v", point{1, 2}), "%+v adds field names")
	assert.Equal(t, "[1 2 3]", fmt.Sprint([]int{1, 2, 3}), "Sprint formats with %v")
}
