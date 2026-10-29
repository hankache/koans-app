// title: Method sets
// intro: Predict each result. A pointer has all its type's methods, but a value lacks the methods with pointer receivers, so only a pointer satisfies an interface that needs them.
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
	assert.Equal(t, ___, speak(Dog{}), "a Dog has Speak")
	assert.Equal(t, ___, speak(&Dog{}), "a *Dog has its value's methods too")
	assert.Equal(t, ___, speak(Cat{}), "a Cat value lacks the pointer method")
	assert.Equal(t, ___, speak(&Cat{}), "a *Cat has it")
}
