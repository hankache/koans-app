package koans

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestSelect(t *testing.T) {
	a := make(chan string, 1)
	b := make(chan string, 1)
	b <- "from b"
	var got string
	select {
	case v := <-a:
		got = v
	case v := <-b:
		got = v
	}
	assert.Equal(t, "from b", got, "only b had a value")
	never := make(chan int)
	select {
	case <-never:
		got = "never"
	case <-time.After(10 * time.Millisecond):
		got = "timed out"
	}
	assert.Equal(t, "timed out", got, "time.After fires after its duration")
	select {
	case v := <-a:
		got = v
	default:
		got = "nothing"
	}
	assert.Equal(t, "nothing", got, "default runs when no channel is ready")
}
