;; title: Anonymous functions
;; intro: `fn` makes a function without a name; `#(…)` is a shorter form, where `%` is its argument, or `%1`, `%2` and so on when there are several.
(is (= ___ ((fn [x] (* x x)) 3)) "fn")
(is (= ___ (map #(* 2 %) [1 2 3])) "#(…) with %")
(is (= ___ (#(+ %1 %2) 3 4)) "%1 and %2")
(is (= ___ (#(str %2 %1) "b" "a")) "%2 is the second argument")
