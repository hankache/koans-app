;; title: Counting with association lists
;; intro: An association list can count things: find the pair for a key and increase its count, or add a pair if there is none.
(define (tally items)
  (fold (lambda (item counts)
          (let ((entry (assq item counts)))
            (if entry
                (begin (set-cdr! entry (+ (cdr entry) 1)) counts)
                (cons (cons item 1) counts))))
        '()
        items))
(define counts (tally '(a b a c a b)))
(test-equal "how many a" ___ (cdr (assq 'a counts)))
(test-equal "how many c" ___ (cdr (assq 'c counts)))
(test-equal "how many keys" ___ (length counts))
