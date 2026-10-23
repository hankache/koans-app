;; title: Building strings
;; intro: `str` joins anything into a string, and `nil` becomes nothing. `count` measures a string and `subs` cuts out a piece.
(is (= ___ (str "a" 1 :b)) "str joins anything")
(is (= ___ (str nil)) "nil becomes nothing")
(is (= ___ (count "hello")) "count counts the characters")
(is (= ___ (subs "hello" 1 4)) "subs stops before its end")
(is (= ___ (subs "hello" 2)) "or goes to the end")
