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
	assert.Equal(t, []string{"Bob", "Dee", "Ann", "Cid"}, names(people), "youngest first, and equal ages keep their order")
	slices.SortFunc(people, func(a, b person) int { return strings.Compare(b.Name, a.Name) })
	assert.Equal(t, "Dee", people[0].Name, "a reversed comparison sorts in reverse")
	words := []string{"b", "A", "a"}
	slices.Sort(words)
	assert.Equal(t, []string{"A", "a", "b"}, words, "capital letters sort before small ones")
}
