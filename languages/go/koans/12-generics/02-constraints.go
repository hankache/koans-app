// title: Constraints
// intro: A constraint limits the types a parameter accepts. `cmp.Ordered` allows any type with `<`; a union like `~int | ~float64` lists types, where `~` includes the named types built on them.
package koans

import (
	"cmp"
	"testing"

	"github.com/stretchr/testify/assert"
)

type Number interface {
	~int | ~float64
}

func Sum[T Number](xs ...T) T {
	var total T
	for _, x := range xs {
		total += x
	}
	return total
}

func Largest[T cmp.Ordered](xs ...T) T {
	m := xs[0]
	for _, x := range xs[1:] {
		if x > m {
			m = x
		}
	}
	return m
}

type Score int

func TestConstraints(t *testing.T) {
	assert.Equal(t, ___, Sum(1, 2, 3), "Sum of ints")
	assert.Equal(t, ___, Sum(1.5, 3), "Sum of float64s")
	assert.Equal(t, ___, Sum(Score(10), Score(20)), "~int includes named types like Score")
	assert.Equal(t, ___, Largest("apple", "pear", "fig"), "cmp.Ordered includes strings")
	assert.Equal(t, ___, cmp.Compare(1, 2), "cmp.Compare gives -1, 0 or 1")
}
