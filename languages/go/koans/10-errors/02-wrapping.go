// title: Wrapping errors
// intro: `fmt.Errorf` with `%w` wraps an error in a message of its own, keeping the original inside. `errors.Is` looks through the wrapping for a given error, and `errors.Unwrap` takes one layer off.
package koans

import (
	"errors"
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

var ErrNotFound = errors.New("not found")

func find(name string) error {
	return fmt.Errorf("find %q: %w", name, ErrNotFound)
}

func TestWrapping(t *testing.T) {
	err := find("bob")
	assert.Equal(t, ___, err.Error(), "the message includes the wrapped one")
	assert.Equal(t, ___, err == ErrNotFound, "it's a different error")
	assert.Equal(t, ___, errors.Is(err, ErrNotFound), "errors.Is finds the wrapped one")
	assert.Equal(t, ___, errors.Unwrap(err), "Unwrap takes one layer off")
	plain := fmt.Errorf("find: %v", ErrNotFound)
	assert.Equal(t, ___, errors.Is(plain, ErrNotFound), "%v copies the message but doesn't wrap")
}
