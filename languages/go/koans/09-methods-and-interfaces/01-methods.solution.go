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
	assert.Equal(t, 6.0, Rect{2, 3}.Area(), "a method is called on a value")
	assert.Equal(t, 212.0, Celsius(100).Fahrenheit(), "a method on a named float64 type")
	assert.Equal(t, 3, Words{"a", "b", "c"}.Count(), "a method on a named slice type")
	area := Rect.Area
	assert.Equal(t, 1.0, area(Rect{1, 1}), "Rect.Area is a function that takes the receiver first")
}
