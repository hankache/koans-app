;; title: Transforming maps
;; intro: Mapping over a map gives `[key value]` pairs, and `into {}` turns pairs back into a map. `update-vals` changes every value, and `merge-with` combines values that clash.
(is (= ___ (update-vals {:a 1 :b 2} inc)) "update-vals changes every value")
(is (= ___ (into {} (map (fn [[k v]] [k (* 10 v)]) {:a 1 :b 2}))) "pairs back into a map")
(is (= ___ (sort (keys {:b 1 :a 2}))) "keywords sort too")
(is (= ___ (merge-with + {:a 1 :b 3} {:a 2})) "merge-with combines values that clash")
(is (= ___ (reduce-kv (fn [m k v] (assoc m v k)) {} {:a 1})) "reduce-kv folds over keys and values")
