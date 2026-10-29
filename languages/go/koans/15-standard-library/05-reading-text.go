// title: Reading text
// intro: An `io.Reader` is anything bytes can be read from: a file, a network connection, or a `strings.Reader`. A `bufio.Scanner` reads one line at a time, or one word, and `io.ReadAll` reads everything.
package koans

import (
	"bufio"
	"io"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestReadingText(t *testing.T) {
	lines := bufio.NewScanner(strings.NewReader("one\ntwo\nthree"))
	var got []string
	for lines.Scan() {
		got = append(got, lines.Text())
	}
	assert.Equal(t, ___, len(got), "Scan reads line by line")
	assert.Equal(t, ___, got[2], "the last line needs no newline")
	words := bufio.NewScanner(strings.NewReader("to be or not"))
	words.Split(bufio.ScanWords)
	n := 0
	for words.Scan() {
		n++
	}
	assert.Equal(t, ___, n, "ScanWords splits on spaces instead")
	data, _ := io.ReadAll(strings.NewReader("all of it"))
	assert.Equal(t, ___, string(data), "io.ReadAll reads to the end")
}
