;; title: Quicksort
;; intro: R7RS has no sort, so here is one: take the first item as a pivot, sort what's smaller and what's not, and put them on either side of it.
(define (quicksort lst)
  (if (null? lst)
      '()
      (let ((pivot (car lst)) (rest (cdr lst)))
        (append (quicksort (filter (lambda (x) (< x pivot)) rest))
                (list pivot)
                (quicksort (filter (lambda (x) (>= x pivot)) rest))))))
(test-equal "sorted" ___ (quicksort '(5 3 8 1 2)))
(test-equal "duplicates stay" ___ (quicksort '(1 2 1)))
(test-equal "nothing to sort" ___ (quicksort '()))
