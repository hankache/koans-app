// title: Loop variables
// intro: Predict each result. Each round of a `for` loop has its own copy of the loop variable, so a closure made in the loop sees its own round's value.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestLoopVariables(t *testing.T) {
	var funcs []func() int
	for i := 0; i < 3; i++ {
		funcs = append(funcs, func() int { return i * 10 })
	}
	assert.Equal(t, ___, []int{funcs[0](), funcs[1](), funcs[2]()}, "each closure saw its own i")
	total := 0
	var adders []func()
	for i := range 4 {
		adders = append(adders, func() { total += i })
	}
	for _, add := range adders {
		add()
	}
	assert.Equal(t, ___, total, "0 + 1 + 2 + 3")
}
