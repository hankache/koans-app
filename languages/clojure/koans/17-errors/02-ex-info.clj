;; title: Errors with data
;; intro: `ex-info` makes an error with a message and a map of data, and optionally the error that caused it. `ex-message`, `ex-data` and `ex-cause` read them back.
(def err (ex-info "Not found" {:status 404 :id 7}))
(def wrapped (ex-info "Request failed" {} err))
(is (= ___ (ex-message err)) "its message")
(is (= ___ (:status (ex-data err))) "its data")
(is (= ___ (ex-message (ex-cause wrapped))) "the cause is kept")
(is (= ___ (try (throw err) (catch :default e (:id (ex-data e))))) "the data survives the throw")
