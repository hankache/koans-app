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
	assert.Equal(t, "Rex", d.Name, "an embedded type's fields are promoted")
	assert.Equal(t, "I am Rex", d.Hello(), "and so are its methods")
	assert.Equal(t, "Rex", d.Animal.Name, "the embedded value is a field named after its type")
	c := Cat{Animal{"Tom"}}
	assert.Equal(t, "Meow", c.Hello(), "the outer type's method hides the embedded one")
	assert.Equal(t, "I am Tom", c.Animal.Hello(), "which can still be called through the field")
}
