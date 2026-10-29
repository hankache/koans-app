// title: Generic types
// intro: Types can have type parameters too: `type Stack[T any] struct{ items []T }`. Each use names its type argument, and the methods use the same parameter. `var zero T` is the zero value of whatever `T` is.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

type Stack[T any] struct {
	items []T
}

func (s *Stack[T]) Push(x T) {
	s.items = append(s.items, x)
}

func (s *Stack[T]) Pop() (T, bool) {
	var zero T
	if len(s.items) == 0 {
		return zero, false
	}
	x := s.items[len(s.items)-1]
	s.items = s.items[:len(s.items)-1]
	return x, true
}

type Pair[K comparable, V any] struct {
	Key K
	Val V
}

func TestGenericTypes(t *testing.T) {
	var s Stack[string]
	s.Push("a")
	s.Push("b")
	top, _ := s.Pop()
	assert.Equal(t, ___, top, "last in, first out")
	s.Pop()
	v, ok := s.Pop()
	assert.Equal(t, ___, v, "an empty stack returns string's zero value")
	assert.Equal(t, ___, ok, "and false")
	p := Pair[string, int]{"age", 30}
	assert.Equal(t, ___, p.Val, "a struct with two type parameters")
}
