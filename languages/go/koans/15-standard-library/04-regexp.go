// title: Regular expressions
// intro: The `regexp` package compiles a pattern once, with `regexp.MustCompile`, then matches, finds or replaces with it. Go's regular expressions always run in linear time, so they have no backreferences.
package koans

import (
	"regexp"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRegexp(t *testing.T) {
	email := regexp.MustCompile(`(\w+)@(\w+)\.com`)
	assert.Equal(t, ___, email.MatchString("ann@example.com"), "MatchString")
	assert.Equal(t, ___, email.FindStringSubmatch("mail bob@site.com now"), "the match, then each group")
	digits := regexp.MustCompile(`\d+`)
	assert.Equal(t, ___, digits.FindAllString("a12b345", -1), "FindAllString finds every match, with -1 for no limit")
	assert.Equal(t, ___, digits.ReplaceAllString("a12b345", "#"), "ReplaceAllString")
}
