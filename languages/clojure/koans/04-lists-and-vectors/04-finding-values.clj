;; title: Finding values
;; intro: `contains?` asks about keys, and a vector's keys are its indexes, which surprises everyone once. To look for a value, use `some` with a set.
(is (= ___ (contains? [:a :b] 1)) "index 1 exists")
(is (= ___ (contains? [:a :b] :a)) "contains? doesn't look at values")
(is (= ___ (some #{:b} [:a :b])) "some with a set finds a value")
(is (= ___ (some #{:z} [:a :b])) "nil when it isn't there")
(is (= ___ (count (filter #{:a} [:a :b :a]))) "count the matches")
