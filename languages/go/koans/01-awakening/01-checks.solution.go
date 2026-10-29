package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestChecks(t *testing.T) {
	assert.Equal(t, 2, 1+1, "Equal compares the expected value with the actual one")
	assert.True(t, true, "True wants a true value")
	assert.False(t, false, "False wants a false value")
	assert.Equal(t, "Go", "G"+"o", "+ joins strings")
	assert.NotEqual(t, 3, 1+1, "NotEqual wants two different values")
}
