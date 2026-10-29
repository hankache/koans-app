package koans

import (
	"testing"
	"unicode/utf8"

	"github.com/stretchr/testify/assert"
)

func TestRunes(t *testing.T) {
	s := "héllo"
	assert.Equal(t, 6, len(s), "é takes two bytes in UTF-8")
	assert.Equal(t, 5, utf8.RuneCountInString(s), "RuneCountInString counts characters")
	assert.Equal(t, 5, len([]rune(s)), "[]rune(s) has one rune per character")
	assert.Equal(t, 'é', []rune(s)[1], "a rune is a character")
	assert.Equal(t, "é", string([]rune(s)[1]), "string(r) turns a rune back into text")
	var positions []int
	for i := range s {
		positions = append(positions, i)
	}
	assert.Equal(t, []int{0, 1, 3, 4, 5}, positions, "range steps by rune, giving byte positions")
}
