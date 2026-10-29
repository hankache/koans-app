// title: Select
// intro: `select` waits on several channel operations and runs the first one ready. A `default` case makes it not wait at all, and `time.After` gives a channel that receives once a time has passed.
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
	assert.Equal(t, ___, got, "only b had a value")
	never := make(chan int)
	select {
	case <-never:
		got = "never"
	case <-time.After(10 * time.Millisecond):
		got = "timed out"
	}
	assert.Equal(t, ___, got, "time.After fires after its duration")
	select {
	case v := <-a:
		got = v
	default:
		got = "nothing"
	}
	assert.Equal(t, ___, got, "default runs when no channel is ready")
}
