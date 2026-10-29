package koans

import (
	"errors"
	"fmt"
	"strconv"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestShadowing(t *testing.T) {
	x := 1
	if true {
		x := 2
		x++
	}
	assert.Equal(t, 1, x, "the inner x was another variable")
	err := errors.New("outer")
	result := ""
	if v, err := strconv.Atoi("5"); err == nil {
		result = fmt.Sprint(v * 2)
	}
	assert.Equal(t, "10", result, "the if had its own err, which was nil")
	assert.Equal(t, "outer", err.Error(), "and the outer err is untouched")
}
