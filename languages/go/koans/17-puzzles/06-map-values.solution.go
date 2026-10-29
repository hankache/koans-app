package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

type item struct{ N int }

func TestMapValues(t *testing.T) {
	m := map[string]item{"a": {1}}
	v := m["a"]
	v.N = 2
	assert.Equal(t, 1, m["a"].N, "v was a copy")
	m["a"] = v
	assert.Equal(t, 2, m["a"].N, "storing it back changes the map")
	ptrs := map[string]*item{"a": {1}}
	ptrs["a"].N = 5
	assert.Equal(t, 5, ptrs["a"].N, "through a pointer, the item changes in place")
}
