// title: Numbers as text
// intro: The `strconv` package converts between strings and numbers. Its parsing functions return an error as well, for text that isn't a number.
package koans

import (
	"strconv"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestStrconv(t *testing.T) {
	assert.Equal(t, ___, strconv.Itoa(42), "Itoa writes an int's digits")
	n, err := strconv.Atoi("123")
	assert.NoError(t, err, "Atoi reads digits without error")
	assert.Equal(t, ___, n, "Atoi reads an int")
	_, err = strconv.Atoi("12a")
	assert.Equal(t, ___, err != nil, "text that isn't a number gives an error")
	assert.Equal(t, ___, strconv.FormatInt(255, 16), "FormatInt writes in any base")
	f, _ := strconv.ParseFloat("2.5", 64)
	assert.Equal(t, ___, f, "ParseFloat reads a float64")
	assert.Equal(t, ___, strconv.Quote("hi"), "Quote writes a Go string literal")
}
