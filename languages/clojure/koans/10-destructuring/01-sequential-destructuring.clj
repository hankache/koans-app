;; title: Taking sequences apart
;; intro: In `let` and in parameters, a vector pattern takes a sequence apart by position: `&` gathers the rest, and `:as` keeps the whole.
(let [[a b] [1 2 3]] (is (= ___ b) "by position"))
(let [[x & more] [1 2 3]] (is (= ___ more) "& gathers the rest"))
(let [[_ second-item] [:a :b]] (is (= ___ second-item) "_ skips an item"))
(let [[a [b c]] [1 [2 3]]] (is (= ___ c) "patterns nest"))
(let [[x :as all] [1 2]] (is (= ___ all) ":as keeps the whole"))
(let [[a b c] [1 2]] (is (= ___ c) "a missing item is nil"))
