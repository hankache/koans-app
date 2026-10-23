;; title: Ordering
;; intro: `sort` puts items in order, with your own comparison if you like; `sort-by` sorts by a function's result. `reverse` turns a sequence around, and `distinct` drops repeats.
(is (= ___ (sort [3 1 2])) "sort")
(is (= ___ (sort > [3 1 2])) "sort takes a comparison")
(is (= ___ (sort-by count ["ccc" "a" "bb"])) "sort-by sorts by a function's result")
(is (= ___ (reverse [1 2 3])) "reverse")
(is (= ___ (distinct [1 2 1 3 2])) "distinct keeps the first of each")
(is (= ___ (dedupe [1 1 2 2 1])) "dedupe drops only repeats next to each other")
