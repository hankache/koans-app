package koans

import (
	"errors"
	"testing"

	"github.com/stretchr/testify/assert"
)

var ErrNegative = errors.New("negative number")

func isqrt(n int) (int, error) {
	if n < 0 {
		return 0, ErrNegative
	}
	r := 0
	for (r+1)*(r+1) <= n {
		r++
	}
	return r, nil
}

func TestErrors(t *testing.T) {
	r, err := isqrt(17)
	assert.Equal(t, 4, r, "the result")
	assert.Equal(t, nil, err, "no error: err is nil")
	_, err = isqrt(-1)
	assert.Equal(t, "negative number", err.Error(), "Error() gives the message")
	assert.Equal(t, true, err == ErrNegative, "a sentinel error can be compared with ==")
	assert.EqualError(t, err, "negative number", "EqualError checks the message")
}
