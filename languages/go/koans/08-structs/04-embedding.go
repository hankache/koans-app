// title: Embedding
// intro: A struct can embed another type by naming it without a field name. The embedded type's fields and methods are promoted: reachable as if they were the outer struct's own. A method of the outer type with the same name hides the embedded one.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

type Animal struct{ Name string }

func (a Animal) Hello() string {
	return "I am " + a.Name
}

type Dog struct {
	Animal
	Breed string
}

type Cat struct{ Animal }

func (c Cat) Hello() string {
	return "Meow"
}

func TestEmbedding(t *testing.T) {
	d := Dog{Animal: Animal{Name: "Rex"}, Breed: "collie"}
	assert.Equal(t, ___, d.Name, "an embedded type's fields are promoted")
	assert.Equal(t, ___, d.Hello(), "and so are its methods")
	assert.Equal(t, ___, d.Animal.Name, "the embedded value is a field named after its type")
	c := Cat{Animal{"Tom"}}
	assert.Equal(t, ___, c.Hello(), "the outer type's method hides the embedded one")
	assert.Equal(t, ___, c.Animal.Hello(), "which can still be called through the field")
}
