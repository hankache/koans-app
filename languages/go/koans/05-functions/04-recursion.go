// title: Recursion
// intro: A function can call itself. A closure can too, if its variable is declared before the function is assigned to it.
package koans

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func factorial(n int) int {
	if n <= 1 {
		return 1
	}
	return n * factorial(n-1)
}

func TestRecursion(t *testing.T) {
	assert.Equal(t, ___, factorial(5), "5 × 4 × 3 × 2 × 1")
	assert.Equal(t, ___, factorial(0), "the base case stops the recursion")
	memo := map[int]int{}
	var fib func(n int) int
	fib = func(n int) int {
		if n < 2 {
			return n
		}
		if v, ok := memo[n]; ok {
			return v
		}
		memo[n] = fib(n-1) + fib(n-2)
		return memo[n]
	}
	assert.Equal(t, ___, fib(6), "fib calls itself through its variable")
	assert.Equal(t, ___, fib(50), "remembering results makes it fast")
}
