// title: Map values
// intro: Predict each result. A map's values aren't variables: `m[k].Field = v` doesn't compile. Read the value, change the copy and store it back, or keep pointers in the map.
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
	assert.Equal(t, ___, m["a"].N, "v was a copy")
	m["a"] = v
	assert.Equal(t, ___, m["a"].N, "storing it back changes the map")
	ptrs := map[string]*item{"a": {1}}
	ptrs["a"].N = 5
	assert.Equal(t, ___, ptrs["a"].N, "through a pointer, the item changes in place")
}
