;; title: If-let and when-let
;; intro: `if-let` and `when-let` test a value and name it in one go. `if-some` treats only `nil` as missing, so `false` still counts.
(is (= ___ (if-let [x (first (filter even? [3 4 5]))] (str "found " x) "none")) "named when found")
(is (= ___ (if-let [x (first (filter even? [1 3]))] (str "found " x) "none")) "the else branch otherwise")
(is (= ___ (if-let [x false] [:got x] :none)) "false counts as missing in if-let")
(is (= ___ (if-some [x false] [:got x] :none)) "but not in if-some")
(is (= ___ (when-let [[a b] (seq [2 3])] (* a b))) "when-let can destructure")
