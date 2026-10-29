package koans

import (
	"slices"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSlicesPackage(t *testing.T) {
	nums := []int{3, 1, 2}
	slices.Sort(nums)
	assert.Equal(t, []int{1, 2, 3}, nums, "Sort sorts in place")
	assert.Equal(t, 2, slices.Index(nums, 3), "Index finds an item's position")
	assert.Equal(t, -1, slices.Index(nums, 7), "or -1")
	assert.Equal(t, true, slices.Contains(nums, 2), "Contains")
	assert.Equal(t, 3, slices.Max(nums), "Max")
	r := slices.Clone(nums)
	slices.Reverse(r)
	assert.Equal(t, []int{3, 2, 1}, r, "Reverse reverses in place")
	assert.Equal(t, true, slices.Equal(nums, []int{1, 2, 3}), "Equal compares item by item")
}
