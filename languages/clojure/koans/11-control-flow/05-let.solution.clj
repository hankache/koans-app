(is (= 7 (let [a 3 b 4] (+ a b))) "names for the body")
(is (= 8 (let [a 3 b (+ a 5)] b)) "later names see earlier ones")
(is (= 2 (let [x 1] (let [x 2] x))) "an inner x hides the outer one")
(is (= 1 (let [x 1] (let [x 2] x) x)) "and leaves it unchanged")
