;; title: Nested lists
;; intro: A list can hold lists, which makes it a tree. Recursion on a tree follows both the `car` and the `cdr`.
(define (count-leaves tree)
  (cond ((null? tree) 0)
        ((pair? tree) (+ (count-leaves (car tree)) (count-leaves (cdr tree))))
        (else 1)))
(test-equal "a flat list" ___ (count-leaves '(a b c)))
(test-equal "nested" ___ (count-leaves '((a b) (c (d)))))
(test-equal "length counts only the top level" ___ (length '((a b) (c (d)))))
