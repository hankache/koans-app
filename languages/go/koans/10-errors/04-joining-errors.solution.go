package koans

import (
	"errors"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestJoiningErrors(t *testing.T) {
	noName := errors.New("no name")
	noEmail := errors.New("no email")
	err := errors.Join(noName, noEmail)
	assert.Equal(t, "no name\nno email", err.Error(), "one line per error")
	assert.Equal(t, true, errors.Is(err, noEmail), "errors.Is checks each joined error")
	assert.Equal(t, nil, errors.Join(nil, nil), "joining only nils gives nil")
}
