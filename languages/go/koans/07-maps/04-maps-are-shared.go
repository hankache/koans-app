// title: Maps are shared
// intro: A map variable refers to the map's data, so assigning or passing a map shares it. A `nil` map can be read but not written: writing to one panics.
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
	assert.Equal(t, ___, m["x"], "assigning a map shares it")
	addOne(m)
	assert.Equal(t, ___, len(m), "a function can change a map it's given")
	c := maps.Clone(m)
	c["x"] = 100
	assert.Equal(t, ___, m["x"], "maps.Clone makes an independent copy")
	var empty map[string]int
	assert.Equal(t, ___, empty["anything"], "reading a nil map is fine")
	assert.PanicsWithError(t, ___, func() { empty["x"] = 1 }, "writing to one panics")
}
