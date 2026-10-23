;; title: Cond
;; intro: `cond` tries its tests in order and gives the value next to the first true one; `:else` catches the rest. `condp` compares one value against several.
(defn size [n] (cond (< n 10) :small (< n 100) :medium :else :large))
(is (= ___ (size 5)) "the first true test wins")
(is (= ___ (size 50)) "then the next")
(is (= ___ (size 500)) ":else takes the rest")
(is (= ___ (cond false 1)) "nil when no test passes")
(is (= ___ (condp = 2 1 :one 2 :two :many)) "condp")
