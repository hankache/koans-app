;; title: Mapcat and for
;; intro: `mapcat` maps, then joins the results. `for` builds a sequence from one or more collections, with `:when` to filter and `:let` to name values.
(is (= ___ (mapcat #(repeat 2 %) [1 2])) "mapcat")
(is (= ___ (for [x (range 4)] (* x x))) "for")
(is (= ___ (for [x (range 5) :when (even? x)] x)) ":when filters")
(is (= ___ (for [k [:a :b] n [1 2]] [k n])) "two collections: the last changes fastest")
(is (= ___ (for [x [1 2] :let [y (* 2 x)]] y)) ":let names a value")
