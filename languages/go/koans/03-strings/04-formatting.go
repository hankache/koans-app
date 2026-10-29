// title: Formatting
// intro: `fmt.Sprintf` formats values into a string with verbs: `%d` for integers, `%s` for strings, `%q` for quoted strings, `%x` for hexadecimal, `%v` for any value and `%+v` for a struct with its field names. A number sets a width, and `.2` a precision.
package koans

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

type point struct{ X, Y int }

func TestFormatting(t *testing.T) {
	assert.Equal(t, ___, fmt.Sprintf("%d %s", 7, "apples"), "%d and %s")
	assert.Equal(t, ___, fmt.Sprintf("%q", "go"), "%q quotes")
	assert.Equal(t, ___, fmt.Sprintf("%.2f", 3.14159), "%.2f keeps two decimals")
	assert.Equal(t, ___, fmt.Sprintf("%5d", 42), "%5d pads to five characters")
	assert.Equal(t, ___, fmt.Sprintf("%x", 255), "%x is hexadecimal")
	assert.Equal(t, ___, fmt.Sprintf("%v", point{1, 2}), "%v shows any value")
	assert.Equal(t, ___, fmt.Sprintf("%+v", point{1, 2}), "%+v adds field names")
	assert.Equal(t, ___, fmt.Sprint([]int{1, 2, 3}), "Sprint formats with %v")
}
