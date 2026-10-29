// title: Pipelines
// intro: Goroutines joined by channels make a pipeline: each stage receives from one channel and sends to the next. The types `<-chan int` (receive only) and `chan<- int` (send only) say which way a stage uses a channel.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func generate(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		for _, n := range nums {
			out <- n
		}
		close(out)
	}()
	return out
}

func square(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		for n := range in {
			out <- n * n
		}
		close(out)
	}()
	return out
}

func TestPipelines(t *testing.T) {
	var got []int
	for n := range square(generate(1, 2, 3)) {
		got = append(got, n)
	}
	assert.Equal(t, ___, got, "values flow through each stage in order")
	sum := 0
	for n := range square(square(generate(2, 3))) {
		sum += n
	}
	assert.Equal(t, ___, sum, "stages compose: 2⁴ + 3⁴")
}
