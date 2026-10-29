package koans

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

type cell struct{ Row, Col int }

func TestSets(t *testing.T) {
	seen := map[string]bool{}
	for _, w := range strings.Fields("a b a c b a") {
		seen[w] = true
	}
	assert.Equal(t, 3, len(seen), "a map holds each key once")
	assert.Equal(t, false, seen["z"], "a missing key gives false")
	board := map[cell]string{{0, 0}: "X"}
	assert.Equal(t, "X", board[cell{0, 0}], "a struct can be a key")
	counts := map[rune]int{}
	for _, r := range "banana" {
		counts[r]++
	}
	assert.Equal(t, 3, counts['a'], "++ on a missing key starts from zero")
}
