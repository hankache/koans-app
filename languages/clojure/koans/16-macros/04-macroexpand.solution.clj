(is (= '(if a (do b)) (macroexpand '(when a b))) "when is an if")
(is (= '(g (f x)) (macroexpand-1 '(-> x f g))) "-> nests the calls")
(is (= '(f (g x)) (macroexpand-1 '(->> x g f))) "so does ->>")
(is (= true (seq? (macroexpand-1 '(when a b)))) "the expansion is a list, ready to run")
