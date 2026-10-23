;; title: If and when
;; intro: `if` takes a test, a value for true and a value for false. `when` has no false branch and can run several forms; `do` groups forms where one is expected.
(is (= ___ (if (> 10 5) :big :small)) "if picks a branch")
(is (= ___ (if false :yes)) "a missing false branch is nil")
(is (= ___ (when false :never)) "when gives nil when its test fails")
(is (= ___ (when true 1 2 3)) "and its last form when it passes")
(is (= ___ (do (str "ignored") "done")) "do gives its last form")
(is (= ___ (if-not true :yes :no)) "if-not reverses the test")
