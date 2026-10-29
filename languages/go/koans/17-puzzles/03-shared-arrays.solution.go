package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSharedArrays(t *testing.T) {
	a := []int{1, 2, 3, 4}
	b := a[:2]
	b = append(b, 99)
	assert.Equal(t, []int{1, 2, 99, 4}, a, "b had spare capacity, so append wrote into a's array")
	c := a[:2:2]
	c = append(c, 7)
	assert.Equal(t, []int{1, 2, 7}, c, "c had none, so append copied")
	assert.Equal(t, 99, a[2], "and a is untouched this time")
}
