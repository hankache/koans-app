// title: Copies
// intro: Assigning a struct copies all its fields, and so does passing one to a function. To share one struct, pass a pointer to it. `range` gives a copy of each item too.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

type Counter struct{ N int }

func incValue(c Counter) {
	c.N++
}

func incPointer(c *Counter) {
	c.N++
}

func TestCopies(t *testing.T) {
	a := Counter{N: 1}
	b := a
	b.N = 10
	assert.Equal(t, ___, a.N, "assigning a struct copies it")
	incValue(a)
	assert.Equal(t, ___, a.N, "a function gets a copy")
	incPointer(&a)
	assert.Equal(t, ___, a.N, "unless it gets a pointer")
	list := []Counter{{1}, {2}}
	for _, c := range list {
		c.N = 0
	}
	assert.Equal(t, ___, list[0].N, "range gives copies of the items")
	for i := range list {
		list[i].N = 0
	}
	assert.Equal(t, ___, list[0].N, "index into the slice to change an item")
}
