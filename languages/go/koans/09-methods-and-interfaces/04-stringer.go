// title: Stringer
// intro: `fmt.Stringer` is the interface with one method, `String() string`. `fmt` uses it to print a value, so a type can choose how it looks.
package koans

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

type Temp float64

func (c Temp) String() string {
	return fmt.Sprintf("%.1f°C", float64(c))
}

type Point struct{ X, Y int }

func TestStringer(t *testing.T) {
	assert.Equal(t, ___, fmt.Sprint(Temp(21.5)), "fmt calls String")
	assert.Equal(t, ___, fmt.Sprint([]Temp{1, 2}), "even inside a slice")
	assert.Equal(t, ___, fmt.Sprint(Point{1, 2}), "without String, fmt shows the fields")
	var s fmt.Stringer = Temp(0)
	assert.Equal(t, ___, s.String(), "Temp satisfies fmt.Stringer")
}
