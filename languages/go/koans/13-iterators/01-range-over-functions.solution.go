package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Countdown(n int) func(func(int) bool) {
	return func(yield func(int) bool) {
		for i := n; i > 0; i-- {
			if !yield(i) {
				return
			}
		}
	}
}

func TestRangeOverFunctions(t *testing.T) {
	var got []int
	for i := range Countdown(3) {
		got = append(got, i)
	}
	assert.Equal(t, []int{3, 2, 1}, got, "the loop gets each value passed to yield")
	got = nil
	for i := range Countdown(10) {
		if i < 8 {
			break
		}
		got = append(got, i)
	}
	assert.Equal(t, []int{10, 9, 8}, got, "break makes yield return false")
	sum := 0
	Countdown(4)(func(i int) bool {
		sum += i
		return true
	})
	assert.Equal(t, 10, sum, "it's an ordinary function, which can be called directly")
}
