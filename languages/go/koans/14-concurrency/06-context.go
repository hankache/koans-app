// title: Context
// intro: A `context.Context` carries a signal to stop: its `Done()` channel is closed when it's canceled, and `Err()` says why. Goroutines watch it to stop early. `WithTimeout` cancels by itself after a while.
package koans

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestContext(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	assert.Equal(t, ___, ctx.Err(), "a live context has no error")
	cancel()
	<-ctx.Done()
	assert.Equal(t, ___, ctx.Err(), "after cancel, Err says why")
	short, stop := context.WithTimeout(context.Background(), 5*time.Millisecond)
	defer stop()
	<-short.Done()
	assert.Equal(t, ___, short.Err(), "a timeout cancels it by itself")
}
