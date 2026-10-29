// title: Joining errors
// intro: `errors.Join` combines several errors into one, whose message has one line for each. `errors.Is` matches any of them.
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
	assert.Equal(t, ___, err.Error(), "one line per error")
	assert.Equal(t, ___, errors.Is(err, noEmail), "errors.Is checks each joined error")
	assert.Equal(t, ___, errors.Join(nil, nil), "joining only nils gives nil")
}
