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
	assert.Equal(t, 10, sum, "the classic three-part loop")
	n := 1
	for n < 100 {
		n *= 2
	}
	assert.Equal(t, 128, n, "a condition alone loops while it holds")
	var seen []int
	for i := range 3 {
		seen = append(seen, i)
	}
	assert.Equal(t, []int{0, 1, 2}, seen, "range over an integer counts from 0")
	count := 0
	for {
		count++
		if count == 5 {
			break
		}
	}
	assert.Equal(t, 5, count, "for alone loops until break")
	odd := 0
	for i := range 10 {
		if i%2 == 0 {
			continue
		}
		odd++
	}
	assert.Equal(t, 5, odd, "continue skips to the next round")
}
