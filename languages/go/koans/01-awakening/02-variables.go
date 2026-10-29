// title: Variables and zero values
// intro: `var` declares a variable. Inside a function, `:=` declares and assigns in one step, with the type inferred. A variable declared without a value holds its type's zero value.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestVariables(t *testing.T) {
	var count int
	assert.Equal(t, ___, count, "an int starts at zero")
	var name string
	assert.Equal(t, ___, name, "a string starts empty")
	var ready bool
	assert.Equal(t, ___, ready, "a bool starts false")
	language := "Go"
	assert.Equal(t, ___, language, ":= declares and assigns")
	x, y := 1, 2
	x, y = y, x
	assert.Equal(t, ___, x, "one assignment can swap two variables")
	assert.Equal(t, ___, y, "the right side is evaluated before anything is assigned")
}
