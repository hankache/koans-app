package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func order() (steps []string) {
	defer func() { steps = append(steps, "first deferred") }()
	defer func() { steps = append(steps, "second deferred") }()
	steps = append(steps, "body")
	return steps
}

func early() (out string) {
	x := "early"
	defer func(v string) { out = v }(x)
	x = "late"
	return x
}

func doubled() (n int) {
	defer func() { n *= 2 }()
	return 21
}

func TestDefer(t *testing.T) {
	assert.Equal(t, []string{"body", "second deferred", "first deferred"}, order(), "deferred calls run in reverse order")
	assert.Equal(t, "early", early(), "a deferred call's arguments are evaluated at once")
	assert.Equal(t, 42, doubled(), "a deferred function can change a named result")
}
