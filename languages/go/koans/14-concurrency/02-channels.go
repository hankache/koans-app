// title: Channels
// intro: A channel passes values between goroutines: `ch <- v` sends and `<-ch` receives. On an unbuffered channel, a send waits for a receiver. `close` says nothing more will come, and `range` receives until then.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestChannels(t *testing.T) {
	ch := make(chan string)
	go func() { ch <- "ping" }()
	assert.Equal(t, ___, <-ch, "the receive waits for the send")
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
	assert.Equal(t, ___, got, "range receives until the channel is closed")
	v, ok := <-nums
	assert.Equal(t, ___, v, "a closed channel gives zero values")
	assert.Equal(t, ___, ok, "and ok is false")
}
