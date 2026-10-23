;; title: Nested maps
;; intro: `get-in`, `assoc-in` and `update-in` follow a path of keys into nested maps.
(def config {:db {:host "localhost" :port 5432}})
(is (= ___ (get-in config [:db :port])) "a path of keys")
(is (= ___ (get-in config [:db :user])) "nil when the path leads nowhere")
(is (= ___ (assoc-in config [:db :host] "example.org")) "assoc-in replaces a nested value")
(is (= ___ (get-in (update-in config [:db :port] inc) [:db :port])) "update-in changes one")
(is (= ___ (assoc-in {} [:a :b] 1)) "assoc-in builds the missing levels")
