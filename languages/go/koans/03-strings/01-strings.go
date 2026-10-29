// title: Strings
// intro: A Go string is an unchangeable sequence of bytes, usually UTF-8 text. `len` counts bytes, indexing gives one byte, and slicing gives a string. In a raw string, between backquotes, `\n` is two characters.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestStrings(t *testing.T) {
	s := "hello"
	assert.Equal(t, ___, len(s), "len counts bytes")
	assert.Equal(t, ___, s[1], "indexing gives a byte")
	assert.Equal(t, ___, s[1:4], "slicing gives a string")
	assert.Equal(t, ___, s+", world", "+ joins strings")
	raw := `a\nb`
	assert.Equal(t, ___, len(raw), "a raw string keeps backslashes as they are")
	assert.Equal(t, ___, "apple" < "banana", "strings compare byte by byte")
}
