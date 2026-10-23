;; title: Questions about numbers
;; intro: Procedures that answer yes or no end in `?`: `zero?`, `positive?`, `even?`. Comparisons check that their arguments are in order.
(test-equal "zero?" ___ (zero? 0))
(test-equal "positive?" ___ (positive? -4))
(test-equal "even?" ___ (even? 10))
(test-equal "odd?" ___ (odd? 10))
(test-equal "every neighboring pair must be in order" ___ (< 1 3 2))
(test-equal "= compares numbers" ___ (= 4 4 4))
