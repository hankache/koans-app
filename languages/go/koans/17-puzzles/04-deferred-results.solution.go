package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func named() (result int) {
	defer func() { result++ }()
	for i := range 3 {
		defer func() { result += i }()
	}
	return 10
}

func unnamed() int {
	x := 1
	defer func() { x = 100 }()
	return x
}

func TestDeferredResults(t *testing.T) {
	assert.Equal(t, 14, named(), "10, then + 2, + 1, + 0, then ++")
	assert.Equal(t, 1, unnamed(), "the result was copied from x before the deferred call changed x")
}
