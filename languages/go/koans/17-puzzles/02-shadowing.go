// title: Shadowing
// intro: Predict each result. `:=` declares new variables in the current block, so inside an inner block it makes a new variable that hides the outer one, rather than assigning to it.
package koans

import (
	"errors"
	"fmt"
	"strconv"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestShadowing(t *testing.T) {
	x := 1
	if true {
		x := 2
		x++
	}
	assert.Equal(t, ___, x, "the inner x was another variable")
	err := errors.New("outer")
	result := ""
	if v, err := strconv.Atoi("5"); err == nil {
		result = fmt.Sprint(v * 2)
	}
	assert.Equal(t, ___, result, "the if had its own err, which was nil")
	assert.Equal(t, ___, err.Error(), "and the outer err is untouched")
}
