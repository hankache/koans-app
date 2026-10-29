package koans

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type recorder struct {
	failures []string
}

func (r *recorder) Errorf(format string, args ...any) {
	r.failures = append(r.failures, fmt.Sprintf(format, args...))
}

func TestAssertions(t *testing.T) {
	r := &recorder{}
	ok := assert.Equal(r, 1, 2)
	assert.Equal(t, false, ok, "an assertion returns whether it passed")
	assert.Equal(t, 1, len(r.failures), "a failure is reported through Errorf")
	assert.Equal(t, true, assert.Contains(r, []int{1, 2}, 2), "Contains checks a slice holds an item")
	assert.Equal(t, true, assert.ElementsMatch(r, []int{1, 2, 3}, []int{3, 1, 2}), "ElementsMatch ignores the order")
	assert.Equal(t, false, assert.Empty(r, []int{0}), "Empty wants no items at all")
	require.Len(t, r.failures, 2, "require stops the test if this fails")
}
