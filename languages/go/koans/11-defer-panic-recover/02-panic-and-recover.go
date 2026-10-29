// title: Panic and recover
// intro: `panic` stops the function and unwinds the stack, running deferred calls on the way. A deferred function that calls `recover` stops the panic and gets its value, and the function returns normally.
package koans

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func safeDivide(a, b int) (q int, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("recovered: %v", r)
		}
	}()
	return a / b, nil
}

func TestPanicAndRecover(t *testing.T) {
	q, err := safeDivide(10, 2)
	assert.Equal(t, ___, q, "no panic: the result as usual")
	assert.NoError(t, err, "and no error")
	_, err = safeDivide(1, 0)
	assert.Equal(t, ___, err.Error(), "dividing an int by zero panics, and recover catches it")
	assert.PanicsWithValue(t, ___, func() { panic("boom") }, "PanicsWithValue checks what was panicked with")
	assert.Equal(t, ___, recover(), "outside a panic, recover returns nil")
}
