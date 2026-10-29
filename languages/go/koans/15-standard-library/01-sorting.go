// title: Sorting
// intro: `slices.SortFunc` sorts with a function that compares two items and returns a negative number, zero or a positive one; `cmp.Compare` writes it for ordered values. `slices.SortStableFunc` keeps equal items in their order.
package koans

import (
	"cmp"
	"slices"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

type person struct {
	Name string
	Age  int
}

func names(people []person) []string {
	var out []string
	for _, p := range people {
		out = append(out, p.Name)
	}
	return out
}

func TestSorting(t *testing.T) {
	people := []person{{"Ann", 30}, {"Bob", 25}, {"Cid", 30}, {"Dee", 25}}
	slices.SortStableFunc(people, func(a, b person) int { return cmp.Compare(a.Age, b.Age) })
	assert.Equal(t, ___, names(people), "youngest first, and equal ages keep their order")
	slices.SortFunc(people, func(a, b person) int { return strings.Compare(b.Name, a.Name) })
	assert.Equal(t, ___, people[0].Name, "a reversed comparison sorts in reverse")
	words := []string{"b", "A", "a"}
	slices.Sort(words)
	assert.Equal(t, ___, words, "capital letters sort before small ones")
}
