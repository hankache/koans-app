;; title: Arithmetic
;; intro: The function comes first, then its arguments: `(+ 1 2)`. Arithmetic functions take any number of arguments, and nesting replaces operator precedence.
(is (= ___ (+ 1 2 3 4)) "+ adds them all")
(is (= ___ (- 5)) "- with one argument negates")
(is (= ___ (* 1 2 3 4)) "* multiplies them all")
(is (= ___ (/ 6 3)) "/ divides")
(is (= ___ (+ 2 (* 3 4))) "the inner call runs first")
(is (= ___ (* (+ 2 3) 4)) "so nesting sets the order")
