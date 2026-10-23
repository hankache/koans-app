;; title: Let
;; intro: `let` names values for its body. Later names can use earlier ones, and an inner `let` can hide a name without changing it outside.
(is (= ___ (let [a 3 b 4] (+ a b))) "names for the body")
(is (= ___ (let [a 3 b (+ a 5)] b)) "later names see earlier ones")
(is (= ___ (let [x 1] (let [x 2] x))) "an inner x hides the outer one")
(is (= ___ (let [x 1] (let [x 2] x) x)) "and leaves it unchanged")
