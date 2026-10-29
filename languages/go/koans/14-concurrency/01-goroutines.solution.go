package koans

import (
	"sync"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGoroutines(t *testing.T) {
	var wg sync.WaitGroup
	squares := make([]int, 5)
	for i := range 5 {
		wg.Go(func() {
			squares[i] = i * i
		})
	}
	wg.Wait()
	assert.Equal(t, []int{0, 1, 4, 9, 16}, squares, "each goroutine fills its own item; Wait waits for them all")
	var mu sync.Mutex
	total := 0
	for i := 1; i <= 100; i++ {
		wg.Go(func() {
			mu.Lock()
			defer mu.Unlock()
			total += i
		})
	}
	wg.Wait()
	assert.Equal(t, 5050, total, "the Mutex lets one goroutine at a time change total")
}
