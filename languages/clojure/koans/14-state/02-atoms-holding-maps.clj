;; title: Atoms holding maps
;; intro: An atom usually holds a map, and `swap!` with `assoc`, `update` or `update-in` changes one part of it.
(def app (atom {:users {} :count 0}))
(swap! app assoc-in [:users :ada] {:age 36})
(swap! app update :count inc)
(is (= ___ (:count @app)) "update")
(is (= ___ (get-in @app [:users :ada :age])) "assoc-in")
(swap! app update-in [:users :ada :age] inc)
(is (= ___ (get-in @app [:users :ada :age])) "update-in")
(is (= ___ (keys (:users @app))) "the rest is unchanged")
