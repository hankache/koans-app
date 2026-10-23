;; title: More threading macros
;; intro: `as->` names the value so it can go anywhere in a step, `some->` stops at the first `nil`, and `cond->` applies a step only when its test is true.
(is (= ___ (as-> 5 x (+ x 1) (* x 2))) "as-> names the value")
(is (= ___ (some-> {:a {:b 1}} :a :b inc)) "some-> threads like ->")
(is (= ___ (some-> {:a nil} :a inc)) "but stops at nil instead of failing")
(is (= ___ (cond-> 1 true inc false (* 10))) "cond-> skips steps whose test is false")
(is (= ___ (cond-> {:n 1} true (assoc :admin true) false (assoc :guest true))) "useful for building maps")
