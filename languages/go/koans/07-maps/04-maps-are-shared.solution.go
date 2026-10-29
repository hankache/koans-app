package koans

import (
	"maps"
	"testing"

	"github.com/stretchr/testify/assert"
)

func addOne(m map[string]int) {
	m["one"] = 1
}

func TestMapsAreShared(t *testing.T) {
	m := map[string]int{}
	alias := m
	alias["x"] = 1
	assert.Equal(t, 1, m["x"], "assigning a map shares it")
	addOne(m)
	assert.Equal(t, 2, len(m), "a function can change a map it's given")
	c := maps.Clone(m)
	c["x"] = 100
	assert.Equal(t, 1, m["x"], "maps.Clone makes an independent copy")
	var empty map[string]int
	assert.Equal(t, 0, empty["anything"], "reading a nil map is fine")
	assert.PanicsWithError(t, "assignment to entry in nil map", func() { empty["x"] = 1 }, "writing to one panics")
}
