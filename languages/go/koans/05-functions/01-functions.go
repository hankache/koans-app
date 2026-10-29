// title: Functions
// intro: A function lists its parameters with their types, then its result type. Parameters of the same type can share it: `func add(a, b int) int`. A function can return several results, and `_` ignores one.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func add(a, b int) int {
	return a + b
}

func divmod(a, b int) (int, int) {
	return a / b, a % b
}

func TestFunctions(t *testing.T) {
	assert.Equal(t, ___, add(2, 3), "a function returns its result")
	q, r := divmod(17, 5)
	assert.Equal(t, ___, q, "the first result")
	assert.Equal(t, ___, r, "the second result")
	_, rest := divmod(9, 4)
	assert.Equal(t, ___, rest, "_ ignores a result")
}
