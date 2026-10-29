// title: Methods
// intro: A method is a function with a receiver, declared outside its type: `func (r Rect) Area() float64`. Any named type you declare can have methods, not just structs.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

type Rect struct{ W, H float64 }

func (r Rect) Area() float64 {
	return r.W * r.H
}

type Celsius float64

func (c Celsius) Fahrenheit() float64 {
	return float64(c)*9/5 + 32
}

type Words []string

func (w Words) Count() int {
	return len(w)
}

func TestMethods(t *testing.T) {
	assert.Equal(t, ___, Rect{2, 3}.Area(), "a method is called on a value")
	assert.Equal(t, ___, Celsius(100).Fahrenheit(), "a method on a named float64 type")
	assert.Equal(t, ___, Words{"a", "b", "c"}.Count(), "a method on a named slice type")
	area := Rect.Area
	assert.Equal(t, ___, area(Rect{1, 1}), "Rect.Area is a function that takes the receiver first")
}
