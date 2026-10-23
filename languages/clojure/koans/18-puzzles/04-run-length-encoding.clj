;; title: Run-length encoding
;; intro: Run-length encoding squeezes repeats: `aaab` becomes `3a1b`. `partition-by identity` finds the runs, and a regular expression undoes them.
(defn encode [s] (apply str (mapcat (fn [run] [(count run) (first run)]) (partition-by identity s))))
(defn decode [s] (apply str (mapcat (fn [[_ n c]] (repeat (parse-long n) c)) (re-seq #"(\d+)(\D)" s))))
(is (= ___ (encode "aaabcc")) "each run becomes a count and a letter")
(is (= ___ (partition-by identity "aaba")) "runs, not equal values")
(is (= ___ (decode "2x3y")) "decoding repeats each letter")
(is (= ___ (decode (encode "hello"))) "the round trip")
