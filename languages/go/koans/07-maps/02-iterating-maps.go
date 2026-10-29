// title: Going through a map
// intro: `range` over a map gives its keys and values in no fixed order, and a different one each time. For a fixed order, sort the keys: `slices.Sorted(maps.Keys(m))`. `fmt` prints a map with its keys sorted.
package koans

import (
	"fmt"
	"maps"
	"slices"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestIteratingMaps(t *testing.T) {
	stock := map[string]int{"pears": 3, "apples": 5, "figs": 0}
	total := 0
	for _, n := range stock {
		total += n
	}
	assert.Equal(t, ___, total, "range gives each key and value")
	assert.Equal(t, ___, slices.Sorted(maps.Keys(stock)), "sort the keys for a fixed order")
	assert.Equal(t, ___, fmt.Sprint(stock), "fmt prints the keys in order")
	for k, n := range stock {
		if n == 0 {
			delete(stock, k)
		}
	}
	assert.Equal(t, ___, len(stock), "deleting during range is allowed")
}
