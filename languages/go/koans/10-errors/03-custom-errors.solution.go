package koans

import (
	"errors"
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

type ValidationError struct {
	Field string
}

func (e *ValidationError) Error() string {
	return e.Field + " is invalid"
}

func signUp(age int) error {
	if age < 0 {
		return fmt.Errorf("sign up: %w", &ValidationError{Field: "age"})
	}
	return nil
}

func TestCustomErrors(t *testing.T) {
	err := signUp(-1)
	assert.Equal(t, "sign up: age is invalid", err.Error(), "the message wraps the ValidationError's")
	var ve *ValidationError
	assert.Equal(t, true, errors.As(err, &ve), "errors.As finds a *ValidationError in the chain")
	assert.Equal(t, "age", ve.Field, "and sets ve to it")
	assert.Equal(t, nil, signUp(30), "a valid age gives no error")
}
