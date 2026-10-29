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
	assert.Equal(t, "hello", s, "v.(string) takes the string out")
	assert.Equal(t, true, ok, "it was a string")
	n, ok := v.(int)
	assert.Equal(t, 0, n, "a failed assertion gives the zero value")
	assert.Equal(t, false, ok, "and false")
	assert.Equal(t, "int 42", describe(42), "a type switch picks the int case")
	assert.Equal(t, "string of length 2", describe("hi"), "in each case, x has that case's type")
	assert.Equal(t, "other float64", describe(1.5), "default catches the rest")
}
