// title: The strings package
// intro: The `strings` package searches, splits, joins, trims and changes case. Each function returns a new string, since strings can't change.
package koans

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestStringsPackage(t *testing.T) {
	assert.Equal(t, ___, strings.Contains("seafood", "foo"), "Contains finds a substring")
	assert.Equal(t, ___, strings.Index("chicken", "ick"), "Index is where a substring starts")
	assert.Equal(t, ___, strings.Split("a,b,c", ","), "Split cuts at each separator")
	assert.Equal(t, ___, strings.Join([]string{"a", "b", "c"}, "-"), "Join puts them back together")
	assert.Equal(t, ___, strings.Fields("  go is   fun "), "Fields splits on runs of spaces")
	assert.Equal(t, ___, strings.TrimSpace("  hi \n"), "TrimSpace trims both ends")
	assert.Equal(t, ___, strings.ToUpper("go"), "ToUpper")
	assert.Equal(t, ___, strings.Repeat("ab", 3), "Repeat")
}
