package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestChannels(t *testing.T) {
	ch := make(chan string)
	go func() { ch <- "ping" }()
	assert.Equal(t, "ping", <-ch, "the receive waits for the send")
	nums := make(chan int)
	go func() {
		for i := range 3 {
			nums <- i * 10
		}
		close(nums)
	}()
	var got []int
	for n := range nums {
		got = append(got, n)
	}
	assert.Equal(t, []int{0, 10, 20}, got, "range receives until the channel is closed")
	v, ok := <-nums
	assert.Equal(t, 0, v, "a closed channel gives zero values")
	assert.Equal(t, false, ok, "and ok is false")
}
