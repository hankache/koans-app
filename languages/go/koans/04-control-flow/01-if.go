// title: If
// intro: `if` needs no parentheses, but always braces. It can start with a short statement, whose variables exist only inside the `if` and its `else`.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func classify(n int) string {
	if n < 0 {
		return "negative"
	} else if n == 0 {
		return "zero"
	}
	return "positive"
}

func TestIf(t *testing.T) {
	assert.Equal(t, ___, classify(-5), "the first true branch runs")
	assert.Equal(t, ___, classify(0), "else if tries the next condition")
	assert.Equal(t, ___, classify(3), "after the if, the function goes on")
	stock := map[string]int{"apples": 4}
	if n, ok := stock["apples"]; ok {
		assert.Equal(t, ___, n, "a short statement runs before the condition")
	}
	result := "in stock"
	if _, ok := stock["pears"]; !ok {
		result = "missing"
	}
	assert.Equal(t, ___, result, "ok is false for a missing key")
}
