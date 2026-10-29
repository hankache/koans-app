// title: Buffered channels
// intro: `make(chan T, n)` makes a channel with room for `n` values: a send waits only when it's full. `len` is how many values are waiting, and `cap` the room.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBufferedChannels(t *testing.T) {
	ch := make(chan int, 3)
	ch <- 1
	ch <- 2
	assert.Equal(t, ___, len(ch), "two values wait in the buffer")
	assert.Equal(t, ___, cap(ch), "with room for three")
	assert.Equal(t, ___, <-ch, "first in, first out")
	full := make(chan int, 1)
	full <- 1
	sent := true
	select {
	case full <- 2:
	default:
		sent = false
	}
	assert.Equal(t, ___, sent, "the buffer was full, so the select's default ran")
}
