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
	assert.Equal(t, true, e == nil, "an interface with nothing in it is nil")
	assert.Equal(t, false, mayFail(false) == nil, "an interface holding a nil pointer is not nil")
	assert.Equal(t, true, mayFailRight(false) == nil, "return nil itself when there's no error")
	var p *MyErr
	assert.Equal(t, "my error", p.Error(), "a method can be called on a nil pointer")
}
