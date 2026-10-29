// title: Helpers and cleanup
// intro: A helper function takes `t *testing.T` to check something for the test; calling `t.Helper()` first makes a failure point at the line that called it. `t.Cleanup` registers a function to run when the test ends.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func requireEven(t *testing.T, n int) bool {
	t.Helper()
	return assert.Equal(t, 0, n%2, "an even number")
}

func TestHelpers(t *testing.T) {
	var log []string
	t.Run("with cleanup", func(t *testing.T) {
		t.Cleanup(func() { log = append(log, "cleanup") })
		log = append(log, "test")
	})
	assert.Equal(t, ___, log, "Cleanup runs when the test ends")
	assert.Equal(t, ___, requireEven(t, 4), "a helper returns what its assertion did")
	assert.Equal(t, ___, t.Name(), "t.Name is the test's name")
}
