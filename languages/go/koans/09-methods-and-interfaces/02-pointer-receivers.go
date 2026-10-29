// title: Pointer receivers
// intro: A method with a value receiver gets a copy; one with a pointer receiver, `func (c *Counter) Inc()`, can change the value it's called on. Called on a variable, Go takes its address for you.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

type Counter struct{ n int }

func (c Counter) Value() int {
	return c.n
}

func (c *Counter) Inc() {
	c.n++
}

func (c Counter) TryInc() {
	c.n++
}

func TestPointerReceivers(t *testing.T) {
	var c Counter
	c.Inc()
	c.Inc()
	assert.Equal(t, ___, c.Value(), "a pointer receiver changes the counter")
	c.TryInc()
	assert.Equal(t, ___, c.Value(), "a value receiver changes a copy")
	p := &c
	p.Inc()
	assert.Equal(t, ___, p.Value(), "value methods can be called through a pointer too")
	inc := c.Inc
	inc()
	assert.Equal(t, ___, c.Value(), "a method value remembers its receiver")
}
