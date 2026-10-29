package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

type Shape interface {
	Area() float64
}

type Square struct{ Side float64 }

func (s Square) Area() float64 {
	return s.Side * s.Side
}

type Triangle struct{ Base, Height float64 }

func (t Triangle) Area() float64 {
	return t.Base * t.Height / 2
}

func total(shapes []Shape) float64 {
	sum := 0.0
	for _, s := range shapes {
		sum += s.Area()
	}
	return sum
}

func TestInterfaces(t *testing.T) {
	var s Shape = Square{2}
	assert.Equal(t, 4.0, s.Area(), "an interface value calls its value's method")
	s = Triangle{3, 4}
	assert.Equal(t, 6.0, s.Area(), "the same variable can hold another type")
	assert.Equal(t, 10.0, total([]Shape{Square{2}, Triangle{3, 4}}), "a slice of an interface type mixes types")
	var empty Shape
	assert.Equal(t, true, empty == nil, "an interface variable starts as nil")
}
