// title: Runes and UTF-8
// intro: A `rune` is a Unicode code point. `range` over a string steps through its runes, giving each one's byte position, and `[]rune(s)` converts a string to its runes.
package koans

import (
	"testing"
	"unicode/utf8"

	"github.com/stretchr/testify/assert"
)

func TestRunes(t *testing.T) {
	s := "héllo"
	assert.Equal(t, ___, len(s), "é takes two bytes in UTF-8")
	assert.Equal(t, ___, utf8.RuneCountInString(s), "RuneCountInString counts characters")
	assert.Equal(t, ___, len([]rune(s)), "[]rune(s) has one rune per character")
	assert.Equal(t, ___, []rune(s)[1], "a rune is a character")
	assert.Equal(t, ___, string([]rune(s)[1]), "string(r) turns a rune back into text")
	var positions []int
	for i := range s {
		positions = append(positions, i)
	}
	assert.Equal(t, ___, positions, "range steps by rune, giving byte positions")
}
