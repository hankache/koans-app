// title: Checks
// intro: A Go test is a function named `TestXxx` that takes `t *testing.T`. With testify, `assert.Equal(t, expected, actual, message)` checks that two values are equal: replace each `___` with the value that makes the check pass.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestChecks(t *testing.T) {
	assert.Equal(t, ___, 1+1, "Equal compares the expected value with the actual one")
	assert.True(t, ___, "True wants a true value")
	assert.False(t, ___, "False wants a false value")
	assert.Equal(t, ___, "G"+"o", "+ joins strings")
	assert.NotEqual(t, ___, 1+1, "NotEqual wants two different values")
}
