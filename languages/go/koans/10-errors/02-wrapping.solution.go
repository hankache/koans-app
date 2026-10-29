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
	assert.Equal(t, `find "bob": not found`, err.Error(), "the message includes the wrapped one")
	assert.Equal(t, false, err == ErrNotFound, "it's a different error")
	assert.Equal(t, true, errors.Is(err, ErrNotFound), "errors.Is finds the wrapped one")
	assert.Equal(t, ErrNotFound, errors.Unwrap(err), "Unwrap takes one layer off")
	plain := fmt.Errorf("find: %v", ErrNotFound)
	assert.Equal(t, false, errors.Is(plain, ErrNotFound), "%v copies the message but doesn't wrap")
}
