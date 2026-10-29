package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

type Speaker interface {
	Speak() string
}

type Dog struct{}

func (Dog) Speak() string {
	return "woof"
}

type Cat struct{}

func (*Cat) Speak() string {
	return "meow"
}

func speak(v any) string {
	if s, ok := v.(Speaker); ok {
		return s.Speak()
	}
	return "silence"
}

func TestMethodSets(t *testing.T) {
	assert.Equal(t, "woof", speak(Dog{}), "a Dog has Speak")
	assert.Equal(t, "woof", speak(&Dog{}), "a *Dog has its value's methods too")
	assert.Equal(t, "silence", speak(Cat{}), "a Cat value lacks the pointer method")
	assert.Equal(t, "meow", speak(&Cat{}), "a *Cat has it")
}
