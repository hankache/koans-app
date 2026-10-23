;; title: Try and catch
;; intro: `try` runs its body; `catch` handles an error, and `finally` always runs. Here, as in ClojureScript, `(catch :default e …)` catches anything.
(is (= ___ (try (throw (ex-info "boom" {})) (catch :default e :caught))) "catch handles the error")
(is (= ___ (try :fine (catch :default e :caught))) "no error, no catch")
(is (= ___ (try (throw (ex-info "boom" {})) (catch :default e (ex-message e)))) "the error is named e")
(def cleaned (atom false))
(try (throw (ex-info "x" {})) (catch :default e nil) (finally (reset! cleaned true)))
(is (= ___ @cleaned) "finally ran")
