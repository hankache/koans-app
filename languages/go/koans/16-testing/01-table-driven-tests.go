// title: Table-driven tests
// intro: Go tests are often table-driven: a slice of cases, each with its inputs and expected result, run in a loop. `t.Run` makes each case a subtest, named after its parent, a slash, and its own name.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Abs(n int) int {
	if n < 0 {
		return -n
	}
	return n
}

func TestAbs(t *testing.T) {
	tests := []struct {
		name string
		in   int
		want int
	}{
		{"positive", 3, 3},
		{"negative", -4, 4},
		{"zero", 0, 0},
	}
	var names []string
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			names = append(names, t.Name())
			assert.Equal(t, tc.want, Abs(tc.in), tc.name)
		})
	}
	assert.Equal(t, ___, len(names), "one subtest per case")
	assert.Equal(t, ___, names[1], "a subtest's name joins its parent's and its own")
	passed := t.Run("empty", func(t *testing.T) {})
	assert.Equal(t, ___, passed, "t.Run reports whether the subtest passed")
}
