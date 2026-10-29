// title: Type assertions and switches
// intro: `x.(T)` takes the concrete value out of an interface. With two results, `v, ok := x.(T)`, a mismatch gives `false` instead of a panic. A type switch picks a case by the value's type.
package koans

import (
	"fmt"
	"strconv"
	"testing"

	"github.com/stretchr/testify/assert"
)

func describe(v any) string {
	switch x := v.(type) {
	case int:
		return fmt.Sprintf("int %d", x)
	case string:
		return "string of length " + strconv.Itoa(len(x))
	default:
		return fmt.Sprintf("other %T", x)
	}
}

func TestTypeAssertions(t *testing.T) {
	var v any = "hello"
	s, ok := v.(string)
	assert.Equal(t, ___, s, "v.(string) takes the string out")
	assert.Equal(t, ___, ok, "it was a string")
	n, ok := v.(int)
	assert.Equal(t, ___, n, "a failed assertion gives the zero value")
	assert.Equal(t, ___, ok, "and false")
	assert.Equal(t, ___, describe(42), "a type switch picks the int case")
	assert.Equal(t, ___, describe("hi"), "in each case, x has that case's type")
	assert.Equal(t, ___, describe(1.5), "default catches the rest")
}
