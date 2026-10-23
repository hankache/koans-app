;; title: Handling errors
;; intro: An error can be caught and turned into a value, so a function can return something sensible instead of failing.
(defn divide [a b] (if (zero? b) (throw (ex-info "Division by zero" {:a a})) (quot a b)))
(defn try-divide [a b] (try (divide a b) (catch :default e (ex-data e))))
(defn safe-parse [s] (or (parse-long s) :invalid))
(is (= ___ (try-divide 10 2)) "no error")
(is (= ___ (try-divide 10 0)) "the error's data instead")
(is (= ___ (safe-parse "ten")) "or a value of your choice")
(is (thrown-with-msg? :default #"zero" (divide 1 0)) "thrown-with-msg? checks the message too")
