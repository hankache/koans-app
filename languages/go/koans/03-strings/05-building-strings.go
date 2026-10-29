// title: Building strings
// intro: Joining strings with `+` in a loop copies them each time. A `strings.Builder` collects the pieces and makes the string once. Converting a string to `[]byte` gives a copy that can be changed.
package koans

import (
	"fmt"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBuildingStrings(t *testing.T) {
	var b strings.Builder
	for i := range 3 {
		fmt.Fprintf(&b, "%d,", i)
	}
	assert.Equal(t, ___, b.String(), "a Builder collects what's written to it")
	assert.Equal(t, ___, b.Len(), "Len counts the bytes so far")
	s := "cat"
	bs := []byte(s)
	bs[0] = 'b'
	assert.Equal(t, ___, string(bs), "a []byte can change")
	assert.Equal(t, ___, s, "the string it was copied from can't")
}
