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
	assert.Equal(t, "Dune", b.Title, "a field, by name")
	assert.Equal(t, false, b.Read, "a field left out is zero")
	b.Read = true
	assert.Equal(t, true, b.Read, "a field can be assigned")
	var empty Book
	assert.Equal(t, Book{}, empty, "a struct's zero value has every field zero")
	assert.Equal(t, true, b == Book{"Dune", 412, true}, "structs compare field by field")
}
