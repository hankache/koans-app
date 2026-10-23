;; title: Macroexpand
;; intro: `macroexpand-1` shows what a macro turns into, one step at a time. Familiar forms like `when` and `->` are macros themselves.
(is (= ___ (macroexpand '(when a b))) "when is an if")
(is (= ___ (macroexpand-1 '(-> x f g))) "-> nests the calls")
(is (= ___ (macroexpand-1 '(->> x g f))) "so does ->>")
(is (= ___ (seq? (macroexpand-1 '(when a b)))) "the expansion is a list, ready to run")
