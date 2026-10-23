;; title: Multimethods
;; intro: A multimethod dispatches on any function of its arguments: `defmulti` names the dispatch function, and each `defmethod` handles one of its values. `:default` handles the rest.
(defmulti area :shape)
(defmethod area :circle [{:keys [r]}] (* 3 r r))
(defmethod area :square [{:keys [side]}] (* side side))
(defmethod area :default [_] 0)
(is (= ___ (area {:shape :circle :r 3})) "dispatch on :shape")
(is (= ___ (area {:shape :square :side 4})) "another value")
(is (= ___ (area {:shape :blob})) ":default catches the rest")
(defmulti greet (fn [lang _] lang))
(defmethod greet :en [_ name] (str "Hello, " name))
(defmethod greet :fr [_ name] (str "Bonjour, " name))
(is (= ___ (greet :fr "Ada")) "dispatch on an argument's value")
