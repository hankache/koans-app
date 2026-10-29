// title: Shared arrays
// intro: Predict each result. Slices share arrays, and `append` writes into spare capacity when there is some. A full slice expression, `a[low:high:max]`, limits the capacity.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSharedArrays(t *testing.T) {
	a := []int{1, 2, 3, 4}
	b := a[:2]
	b = append(b, 99)
	assert.Equal(t, ___, a, "b had spare capacity, so append wrote into a's array")
	c := a[:2:2]
	c = append(c, 7)
	assert.Equal(t, ___, c, "c had none, so append copied")
	assert.Equal(t, ___, a[2], "and a is untouched this time")
}
