;; title: Named let
;; intro: A named `let` gives the loop a name, so it can call itself with new values. It's the usual way to write a loop in Scheme.
(test-equal "counting up" ___ (let loop ((i 3) (acc '())) (if (< i 0) acc (loop (- i 1) (cons i acc)))))
(test-equal "the largest item" ___ (let loop ((lst '(3 9 4)) (best 0)) (if (null? lst) best (loop (cdr lst) (max best (car lst))))))
(define (my-reverse lst) (let loop ((lst lst) (acc '())) (if (null? lst) acc (loop (cdr lst) (cons (car lst) acc)))))
(test-equal "reverse, with an accumulator" ___ (my-reverse '(a b c)))
