;; title: Recursion on lists
;; intro: Many list procedures follow one pattern: if the list is empty, return a result; otherwise combine its `car` with a recursive call on its `cdr`.
(define (sum lst) (if (null? lst) 0 (+ (car lst) (sum (cdr lst)))))
(define (doubled lst) (if (null? lst) '() (cons (* 2 (car lst)) (doubled (cdr lst)))))
(define (evens lst)
  (cond ((null? lst) '())
        ((even? (car lst)) (cons (car lst) (evens (cdr lst))))
        (else (evens (cdr lst)))))
(test-equal "sum" ___ (sum '(1 2 3 4)))
(test-equal "a new list, built with cons" ___ (doubled '(1 2 3)))
(test-equal "keeping some items" ___ (evens '(1 2 3 4 5)))
