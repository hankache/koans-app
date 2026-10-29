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
	assert.Equal(t, 1, a.N, "assigning a struct copies it")
	incValue(a)
	assert.Equal(t, 1, a.N, "a function gets a copy")
	incPointer(&a)
	assert.Equal(t, 2, a.N, "unless it gets a pointer")
	list := []Counter{{1}, {2}}
	for _, c := range list {
		c.N = 0
	}
	assert.Equal(t, 1, list[0].N, "range gives copies of the items")
	for i := range list {
		list[i].N = 0
	}
	assert.Equal(t, 0, list[0].N, "index into the slice to change an item")
}
