;; title: Updating association lists
;; intro: To change a value, put a new pair in front: lookups find the first pair for a key, so it hides the old one, and the old list is left as it was.
(define (update alist key value) (cons (cons key value) alist))
(define stock '((apples . 3) (pears . 5)))
(define new-stock (update stock 'apples 10))
(test-equal "the new pair hides the old one" ___ (cdr (assq 'apples new-stock)))
(test-equal "the old list is unchanged" ___ (cdr (assq 'apples stock)))
(test-equal "the keys" ___ (map car stock))
