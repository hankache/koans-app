package koans

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestContext(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	assert.Equal(t, nil, ctx.Err(), "a live context has no error")
	cancel()
	<-ctx.Done()
	assert.Equal(t, context.Canceled, ctx.Err(), "after cancel, Err says why")
	short, stop := context.WithTimeout(context.Background(), 5*time.Millisecond)
	defer stop()
	<-short.Done()
	assert.Equal(t, context.DeadlineExceeded, short.Err(), "a timeout cancels it by itself")
}
