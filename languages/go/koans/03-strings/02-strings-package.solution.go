package koans

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestStringsPackage(t *testing.T) {
	assert.Equal(t, true, strings.Contains("seafood", "foo"), "Contains finds a substring")
	assert.Equal(t, 2, strings.Index("chicken", "ick"), "Index is where a substring starts")
	assert.Equal(t, []string{"a", "b", "c"}, strings.Split("a,b,c", ","), "Split cuts at each separator")
	assert.Equal(t, "a-b-c", strings.Join([]string{"a", "b", "c"}, "-"), "Join puts them back together")
	assert.Equal(t, []string{"go", "is", "fun"}, strings.Fields("  go is   fun "), "Fields splits on runs of spaces")
	assert.Equal(t, "hi", strings.TrimSpace("  hi \n"), "TrimSpace trims both ends")
	assert.Equal(t, "GO", strings.ToUpper("go"), "ToUpper")
	assert.Equal(t, "ababab", strings.Repeat("ab", 3), "Repeat")
}
