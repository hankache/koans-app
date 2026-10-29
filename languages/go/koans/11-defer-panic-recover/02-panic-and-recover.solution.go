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
	assert.Equal(t, 5, q, "no panic: the result as usual")
	assert.NoError(t, err, "and no error")
	_, err = safeDivide(1, 0)
	assert.Equal(t, "recovered: runtime error: integer divide by zero", err.Error(), "dividing an int by zero panics, and recover catches it")
	assert.PanicsWithValue(t, "boom", func() { panic("boom") }, "PanicsWithValue checks what was panicked with")
	assert.Equal(t, nil, recover(), "outside a panic, recover returns nil")
}
