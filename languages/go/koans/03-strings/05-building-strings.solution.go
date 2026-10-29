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
	assert.Equal(t, "0,1,2,", b.String(), "a Builder collects what's written to it")
	assert.Equal(t, 6, b.Len(), "Len counts the bytes so far")
	s := "cat"
	bs := []byte(s)
	bs[0] = 'b'
	assert.Equal(t, "bat", string(bs), "a []byte can change")
	assert.Equal(t, "cat", s, "the string it was copied from can't")
}
