// title: Errors
// intro: A Go function reports failure by returning an `error` as its last result, `nil` when all went well. The caller checks it right away, with `if err != nil`. `errors.New` makes an error from a message.
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
	assert.Equal(t, ___, r, "the result")
	assert.Equal(t, ___, err, "no error: err is nil")
	_, err = isqrt(-1)
	assert.Equal(t, ___, err.Error(), "Error() gives the message")
	assert.Equal(t, ___, err == ErrNegative, "a sentinel error can be compared with ==")
	assert.EqualError(t, err, ___, "EqualError checks the message")
}
