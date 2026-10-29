package koans

import (
	"regexp"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRegexp(t *testing.T) {
	email := regexp.MustCompile(`(\w+)@(\w+)\.com`)
	assert.Equal(t, true, email.MatchString("ann@example.com"), "MatchString")
	assert.Equal(t, []string{"bob@site.com", "bob", "site"}, email.FindStringSubmatch("mail bob@site.com now"), "the match, then each group")
	digits := regexp.MustCompile(`\d+`)
	assert.Equal(t, []string{"12", "345"}, digits.FindAllString("a12b345", -1), "FindAllString finds every match, with -1 for no limit")
	assert.Equal(t, "a#b#", digits.ReplaceAllString("a12b345", "#"), "ReplaceAllString")
}
