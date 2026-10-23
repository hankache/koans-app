;; title: Let
;; intro: `let` names values for its body. With `let`, the values can't see each other's names; with `let*`, each sees the ones before it.
(test-equal "let names values" ___ (let ((a 3) (b 4)) (+ a b)))
(define x 1)
(test-equal "an inner name hides an outer one" ___ (let ((x 2)) x))
(test-equal "and leaves it unchanged" ___ x)
(test-equal "let's values see the outer x" ___ (let ((x 10) (y x)) (+ x y)))
(test-equal "let* sees the names before" ___ (let* ((x 10) (y x)) (+ x y)))
