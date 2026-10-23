;; title: FizzBuzz
;; intro: The classic: count from 1, but say "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for both.
(define (fizzbuzz n)
  (cond ((= 0 (remainder n 15)) "FizzBuzz")
        ((= 0 (remainder n 3)) "Fizz")
        ((= 0 (remainder n 5)) "Buzz")
        (else (number->string n))))
(test-equal "a multiple of 3" ___ (fizzbuzz 9))
(test-equal "a multiple of 5" ___ (fizzbuzz 10))
(test-equal "a multiple of both" ___ (fizzbuzz 30))
(test-equal "the first five" ___ (map fizzbuzz (iota 5 1)))
