;; title: Tail calls
;; intro: A call that is the last thing a procedure does is a tail call, and Scheme guarantees it uses no extra space. Passing the result so far along, in an accumulator, makes a recursion a loop.
(define (sum-to n acc) (if (= n 0) acc (sum-to (- n 1) (+ acc n))))
(define (count-down n) (if (= n 0) 'liftoff (count-down (- n 1))))
(test-equal "the accumulator holds the result so far" ___ (sum-to 5 0))
(test-equal "a million calls deep, and no stack used" ___ (count-down 1000000))
(test-equal "the same, with a big sum" ___ (sum-to 1000000 0))
