// title: Labels
// intro: `break` and `continue` act on the innermost loop. A label names an outer loop, so `break outer` leaves both loops at once and `continue outer` starts the outer loop's next round.
package koans

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestLabels(t *testing.T) {
	found := -1
	for i, v := range []int{4, 8, 15, 16} {
		if v > 10 {
			found = i
			break
		}
	}
	assert.Equal(t, ___, found, "break leaves the loop at once")
	var pairs []string
outer:
	for i := range 3 {
		for j := range 3 {
			if j > i {
				continue outer
			}
			if i == 2 {
				break outer
			}
			pairs = append(pairs, fmt.Sprint(i, j))
		}
	}
	assert.Equal(t, ___, pairs, "continue outer and break outer act on the outer loop")
}
