;; title: Records
;; intro: `defrecord` defines a kind of map with named fields. A record works like a map, and `->Point` and `map->Point` build one.
(defrecord Point [x y])
(def p (->Point 1 2))
(is (= ___ (:x p)) "a field, read like a map key")
(is (= ___ (into {} (map->Point {:x 3 :y 4}))) "map->Point builds one from a map")
(is (= ___ (:x (assoc p :x 9))) "assoc works as on a map")
(is (= ___ (= p (->Point 1 2))) "records with equal fields are equal")
(is (= ___ (= p {:x 1 :y 2})) "but not equal to a plain map")
(is (= ___ (record? p)) "record?")
