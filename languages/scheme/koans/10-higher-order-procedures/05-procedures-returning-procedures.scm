;; title: Procedures that return procedures
;; intro: A procedure can make and return a new procedure. That's how to build `compose`, or an adder that remembers its number.
(define (adder n) (lambda (x) (+ x n)))
(define (compose f g) (lambda (x) (f (g x))))
(define (twice f) (compose f f))
(test-equal "an adder" ___ ((adder 5) 3))
(test-equal "map with a made procedure" ___ (map (adder 10) '(1 2)))
(test-equal "compose runs g, then f" ___ ((compose (adder 1) (lambda (x) (* 2 x))) 5))
(test-equal "twice" ___ ((twice square) 2))
