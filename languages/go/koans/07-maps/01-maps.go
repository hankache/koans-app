// title: Maps
// intro: A map links keys to values: `map[string]int`. A missing key gives the value type's zero value, and the two-result form, `v, ok := m[k]`, tells whether the key was there.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMaps(t *testing.T) {
	ages := map[string]int{"alice": 31, "bob": 25}
	assert.Equal(t, ___, ages["alice"], "look up a key")
	assert.Equal(t, ___, ages["carol"], "a missing key gives the zero value")
	_, ok := ages["carol"]
	assert.Equal(t, ___, ok, "ok tells a missing key from a zero value")
	ages["carol"] = 40
	assert.Equal(t, ___, len(ages), "assigning to a new key adds it")
	delete(ages, "bob")
	assert.Equal(t, ___, len(ages), "delete removes one")
	ages["alice"]++
	assert.Equal(t, ___, ages["alice"], "a value can be changed in place")
}
