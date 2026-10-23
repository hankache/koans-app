;; title: Do loops
;; intro: `do` loops: each variable has a start and a step, and the loop ends when its test is true, giving the value after the test.
(test-equal "sum of 0 to 4" ___ (do ((i 0 (+ i 1)) (sum 0 (+ sum i))) ((= i 5) sum)))
(test-equal "building a list" ___ (do ((i 3 (- i 1)) (acc '() (cons i acc))) ((= i 0) acc)))
(define v (make-vector 3))
(do ((i 0 (+ i 1))) ((= i 3)) (vector-set! v i (* i i)))
(test-equal "a loop for its effects" ___ v)
