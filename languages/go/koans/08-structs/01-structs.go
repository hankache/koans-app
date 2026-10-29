// title: Structs
// intro: A struct groups named fields. A struct literal can name its fields, and a field left out holds its zero value. Two structs of the same type compare with `==`, field by field.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

type Book struct {
	Title string
	Pages int
	Read  bool
}

func TestStructs(t *testing.T) {
	b := Book{Title: "Dune", Pages: 412}
	assert.Equal(t, ___, b.Title, "a field, by name")
	assert.Equal(t, ___, b.Read, "a field left out is zero")
	b.Read = true
	assert.Equal(t, ___, b.Read, "a field can be assigned")
	var empty Book
	assert.Equal(t, ___, empty, "a struct's zero value has every field zero")
	assert.Equal(t, ___, b == Book{"Dune", 412, true}, "structs compare field by field")
}
