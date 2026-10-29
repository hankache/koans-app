// title: Nil and interfaces
// intro: An interface value holds a type and a value, and it's `nil` only when both are missing. An interface holding a nil pointer isn't nil: a classic surprise when returning errors.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

type MyErr struct{}

func (*MyErr) Error() string {
	return "my error"
}

func mayFail(fail bool) error {
	var p *MyErr
	if fail {
		p = &MyErr{}
	}
	return p
}

func mayFailRight(fail bool) error {
	if fail {
		return &MyErr{}
	}
	return nil
}

func TestNilInterfaces(t *testing.T) {
	var e error
	assert.Equal(t, ___, e == nil, "an interface with nothing in it is nil")
	assert.Equal(t, ___, mayFail(false) == nil, "an interface holding a nil pointer is not nil")
	assert.Equal(t, ___, mayFailRight(false) == nil, "return nil itself when there's no error")
	var p *MyErr
	assert.Equal(t, ___, p.Error(), "a method can be called on a nil pointer")
}
