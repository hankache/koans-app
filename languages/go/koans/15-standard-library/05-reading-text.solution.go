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
	assert.Equal(t, 3, len(got), "Scan reads line by line")
	assert.Equal(t, "three", got[2], "the last line needs no newline")
	words := bufio.NewScanner(strings.NewReader("to be or not"))
	words.Split(bufio.ScanWords)
	n := 0
	for words.Scan() {
		n++
	}
	assert.Equal(t, 4, n, "ScanWords splits on spaces instead")
	data, _ := io.ReadAll(strings.NewReader("all of it"))
	assert.Equal(t, "all of it", string(data), "io.ReadAll reads to the end")
}
