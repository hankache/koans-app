// title: Closures
// intro: Functions are values: they can be stored, passed and returned. A function literal is a closure: it keeps the variables it uses from where it was made, even after that function returns.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func counter() func() int {
	n := 0
	return func() int {
		n++
		return n
	}
}

func apply(f func(int) int, x int) int {
	return f(x)
}

func TestClosures(t *testing.T) {
	next := counter()
	next()
	assert.Equal(t, ___, next(), "a closure keeps its own n")
	other := counter()
	assert.Equal(t, ___, other(), "each closure has its own variables")
	double := func(x int) int { return x * 2 }
	assert.Equal(t, ___, apply(double, 7), "a function can be passed as a value")
	var f func()
	assert.Equal(t, ___, f == nil, "a function variable starts as nil")
}
