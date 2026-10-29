// title: Append and copy
// intro: While a slice has spare capacity, `append` writes into the shared array, where another slice may see it. `copy` copies items into a slice of its own, and `slices.Clone` makes an independent copy.
package koans

import (
	"slices"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestAppendAndCopy(t *testing.T) {
	base := make([]int, 3, 4)
	a := append(base, 1)
	b := append(base, 2)
	assert.Equal(t, ___, a[3], "a and b share base's array, so b's append overwrote a's")
	assert.Equal(t, ___, len(b), "both have length 4")
	full := []int{1, 2, 3}
	c := append(full, 4)
	c[0] = 100
	assert.Equal(t, ___, full[0], "with no spare capacity, append copied to a new array")
	dst := make([]int, 2)
	n := copy(dst, []int{7, 8, 9})
	assert.Equal(t, ___, n, "copy copies as many items as fit")
	assert.Equal(t, ___, dst, "into the slice it's given")
	clone := slices.Clone(full)
	clone[0] = 0
	assert.Equal(t, ___, full, "slices.Clone makes an independent copy")
}
