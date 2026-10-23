(is (= 9 ((fn [x] (* x x)) 3)) "fn")
(is (= [2 4 6] (map #(* 2 %) [1 2 3])) "#(…) with %")
(is (= 7 (#(+ %1 %2) 3 4)) "%1 and %2")
(is (= "ab" (#(str %2 %1) "b" "a")) "%2 is the second argument")
