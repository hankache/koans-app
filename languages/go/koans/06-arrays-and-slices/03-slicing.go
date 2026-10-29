// title: Slicing
// intro: `s[low:high]` is a slice of the items from `low` up to, but not including, `high`. It shares the same array: changing an item through one slice changes it for the other.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSlicing(t *testing.T) {
	nums := []int{0, 1, 2, 3, 4, 5}
	assert.Equal(t, ___, nums[1:4], "from 1 up to, not including, 4")
	assert.Equal(t, ___, nums[:2], "low defaults to 0")
	assert.Equal(t, ___, nums[4:], "high defaults to the length")
	part := nums[2:4]
	part[0] = 99
	assert.Equal(t, ___, nums[2], "a slice shares its array")
	assert.Equal(t, ___, cap(part), "its capacity reaches to the array's end")
}
