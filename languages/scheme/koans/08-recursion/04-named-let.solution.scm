(test-equal "counting up" '(0 1 2 3) (let loop ((i 3) (acc '())) (if (< i 0) acc (loop (- i 1) (cons i acc)))))
(test-equal "the largest item" 9 (let loop ((lst '(3 9 4)) (best 0)) (if (null? lst) best (loop (cdr lst) (max best (car lst))))))
(define (my-reverse lst) (let loop ((lst lst) (acc '())) (if (null? lst) acc (loop (cdr lst) (cons (car lst) acc)))))
(test-equal "reverse, with an accumulator" '(c b a) (my-reverse '(a b c)))
