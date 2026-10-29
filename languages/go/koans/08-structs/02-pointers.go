// title: Pointers
// intro: `&x` takes a variable's address, and `*p` reads or writes what the pointer points to. A struct's fields are reached through a pointer directly: `p.Pages` means `(*p).Pages`.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

type Book struct {
	Title string
	Pages int
}

func double(n *int) {
	*n *= 2
}

func TestPointers(t *testing.T) {
	x := 5
	p := &x
	*p = 7
	assert.Equal(t, ___, x, "writing through a pointer changes the variable")
	double(&x)
	assert.Equal(t, ___, x, "a function can change a variable through its address")
	b := &Book{Title: "Emma"}
	b.Pages = 100
	assert.Equal(t, ___, (*b).Pages, "b.Pages is short for (*b).Pages")
	var none *int
	assert.Equal(t, ___, none == nil, "a pointer starts as nil")
	q := new(int)
	assert.Equal(t, ___, *q, "new makes a zero value and returns its address")
}
