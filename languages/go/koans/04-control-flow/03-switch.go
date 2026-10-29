// title: Switch
// intro: A `switch` runs the first matching case and stops: no `break` needed. A case can list several values, and a switch with no value tests conditions, like a chain of `if`s. `fallthrough` goes on into the next case's body.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func kind(c rune) string {
	switch c {
	case 'a', 'e', 'i', 'o', 'u':
		return "vowel"
	case ' ':
		return "space"
	default:
		return "consonant"
	}
}

func size(n int) string {
	switch {
	case n < 10:
		return "small"
	case n < 100:
		return "medium"
	}
	return "large"
}

func TestSwitch(t *testing.T) {
	assert.Equal(t, ___, kind('e'), "a case can list several values")
	assert.Equal(t, ___, kind('z'), "default runs when nothing matches")
	assert.Equal(t, ___, size(42), "a switch without a value tests conditions")
	assert.Equal(t, ___, size(500), "no case matched, so the code after the switch runs")
	var steps []string
	switch 1 {
	case 1:
		steps = append(steps, "one")
		fallthrough
	case 2:
		steps = append(steps, "two")
	case 3:
		steps = append(steps, "three")
	}
	assert.Equal(t, ___, steps, "fallthrough runs the next case's body too")
}
