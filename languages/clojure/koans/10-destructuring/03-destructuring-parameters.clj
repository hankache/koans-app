;; title: Destructuring parameters
;; intro: Parameters can be patterns too, so a function can take apart what it's given, even keyword arguments.
(defn full-name [{:keys [first last]}] (str first " " last))
(defn distance [[x1 y1] [x2 y2]] (+ (abs (- x2 x1)) (abs (- y2 y1))))
(defn verbose? [& {:keys [verbose] :or {verbose false}}] verbose)
(is (= ___ (full-name {:first "Ada" :last "Lovelace"})) "a map parameter")
(is (= ___ (distance [1 2] [4 6])) "two vector parameters")
(is (= ___ (verbose? :verbose true)) "keyword arguments, gathered into a map")
(is (= ___ (verbose?)) "with a default")
(is (= ___ (first (map (fn [[k v]] [k v]) {:a 1}))) "a map's entries take apart as pairs")
