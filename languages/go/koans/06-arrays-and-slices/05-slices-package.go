// title: The slices package
// intro: The `slices` package works on slices of any type: sorting, searching, comparing and more. Slices can't be compared with `==`, but `slices.Equal` compares them item by item.
package koans

import (
	"slices"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSlicesPackage(t *testing.T) {
	nums := []int{3, 1, 2}
	slices.Sort(nums)
	assert.Equal(t, ___, nums, "Sort sorts in place")
	assert.Equal(t, ___, slices.Index(nums, 3), "Index finds an item's position")
	assert.Equal(t, ___, slices.Index(nums, 7), "or -1")
	assert.Equal(t, ___, slices.Contains(nums, 2), "Contains")
	assert.Equal(t, ___, slices.Max(nums), "Max")
	r := slices.Clone(nums)
	slices.Reverse(r)
	assert.Equal(t, ___, r, "Reverse reverses in place")
	assert.Equal(t, ___, slices.Equal(nums, []int{1, 2, 3}), "Equal compares item by item")
}
