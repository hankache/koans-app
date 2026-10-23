;; title: Working with records
;; intro: Records go in lists like any other value, and list procedures work on them through their fields.
(define-record-type item (make-item name price) item? (name item-name) (price item-price))
(define cart (list (make-item 'tea 4) (make-item 'cake 6) (make-item 'jam 3)))
(test-equal "the names" ___ (map item-name cart))
(test-equal "the total" ___ (fold + 0 (map item-price cart)))
(test-equal "the cheap ones" ___ (map item-name (filter (lambda (i) (< (item-price i) 5)) cart)))
