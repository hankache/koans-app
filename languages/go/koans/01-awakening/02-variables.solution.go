package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestVariables(t *testing.T) {
	var count int
	assert.Equal(t, 0, count, "an int starts at zero")
	var name string
	assert.Equal(t, "", name, "a string starts empty")
	var ready bool
	assert.Equal(t, false, ready, "a bool starts false")
	language := "Go"
	assert.Equal(t, "Go", language, ":= declares and assigns")
	x, y := 1, 2
	x, y = y, x
	assert.Equal(t, 2, x, "one assignment can swap two variables")
	assert.Equal(t, 1, y, "the right side is evaluated before anything is assigned")
}
