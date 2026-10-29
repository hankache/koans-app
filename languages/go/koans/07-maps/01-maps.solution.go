package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMaps(t *testing.T) {
	ages := map[string]int{"alice": 31, "bob": 25}
	assert.Equal(t, 31, ages["alice"], "look up a key")
	assert.Equal(t, 0, ages["carol"], "a missing key gives the zero value")
	_, ok := ages["carol"]
	assert.Equal(t, false, ok, "ok tells a missing key from a zero value")
	ages["carol"] = 40
	assert.Equal(t, 3, len(ages), "assigning to a new key adds it")
	delete(ages, "bob")
	assert.Equal(t, 2, len(ages), "delete removes one")
	ages["alice"]++
	assert.Equal(t, 32, ages["alice"], "a value can be changed in place")
}
