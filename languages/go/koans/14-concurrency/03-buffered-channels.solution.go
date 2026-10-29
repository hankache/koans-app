package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBufferedChannels(t *testing.T) {
	ch := make(chan int, 3)
	ch <- 1
	ch <- 2
	assert.Equal(t, 2, len(ch), "two values wait in the buffer")
	assert.Equal(t, 3, cap(ch), "with room for three")
	assert.Equal(t, 1, <-ch, "first in, first out")
	full := make(chan int, 1)
	full <- 1
	sent := true
	select {
	case full <- 2:
	default:
		sent = false
	}
	assert.Equal(t, false, sent, "the buffer was full, so the select's default ran")
}
