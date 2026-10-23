;; title: Assertions
;; intro: Clojure code is tested with `clojure.test`: `(is (= expected actual) "why")` passes when the two are equal. Replace each `___` so every assertion holds.
(is (= ___ (+ 1 1)) "= compares two values")
(is (= ___ (str "Clo" "jure")) "str joins strings")
(is (= ___ (count [1 2 3])) "count counts the items")
(is ___ "is passes when its form is true")
(is (= ___ (= [1 2] [1 2])) "collections are equal when their contents are")
