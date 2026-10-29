package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestStrings(t *testing.T) {
	s := "hello"
	assert.Equal(t, 5, len(s), "len counts bytes")
	assert.Equal(t, 'e', s[1], "indexing gives a byte")
	assert.Equal(t, "ell", s[1:4], "slicing gives a string")
	assert.Equal(t, "hello, world", s+", world", "+ joins strings")
	raw := `a\nb`
	assert.Equal(t, 4, len(raw), "a raw string keeps backslashes as they are")
	assert.Equal(t, true, "apple" < "banana", "strings compare byte by byte")
}
