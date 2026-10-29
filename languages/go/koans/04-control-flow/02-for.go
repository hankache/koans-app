// title: For
// intro: `for` is Go's only loop, in three forms: the classic `for i := 0; i < n; i++`, a condition alone, which loops while it holds, and `range`, which also counts up to an integer: `for i := range 3`.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFor(t *testing.T) {
	sum := 0
	for i := 1; i <= 4; i++ {
		sum += i
	}
	assert.Equal(t, ___, sum, "the classic three-part loop")
	n := 1
	for n < 100 {
		n *= 2
	}
	assert.Equal(t, ___, n, "a condition alone loops while it holds")
	var seen []int
	for i := range 3 {
		seen = append(seen, i)
	}
	assert.Equal(t, ___, seen, "range over an integer counts from 0")
	count := 0
	for {
		count++
		if count == 5 {
			break
		}
	}
	assert.Equal(t, ___, count, "for alone loops until break")
	odd := 0
	for i := range 10 {
		if i%2 == 0 {
			continue
		}
		odd++
	}
	assert.Equal(t, ___, odd, "continue skips to the next round")
}
