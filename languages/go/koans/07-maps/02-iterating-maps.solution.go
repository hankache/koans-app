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
	assert.Equal(t, 8, total, "range gives each key and value")
	assert.Equal(t, []string{"apples", "figs", "pears"}, slices.Sorted(maps.Keys(stock)), "sort the keys for a fixed order")
	assert.Equal(t, "map[apples:5 figs:0 pears:3]", fmt.Sprint(stock), "fmt prints the keys in order")
	for k, n := range stock {
		if n == 0 {
			delete(stock, k)
		}
	}
	assert.Equal(t, 2, len(stock), "deleting during range is allowed")
}
