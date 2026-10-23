;; title: Case
;; intro: `case` goes straight to the branch that matches a constant, or one of a list of constants. A last, unpaired value is the default.
(defn kind [x] (case x (1 2 3) :small 10 :ten "ten" :text :other))
(is (= ___ (kind 2)) "one of a list")
(is (= ___ (kind 10)) "a number")
(is (= ___ (kind "ten")) "a string")
(is (= ___ (kind 99)) "the default")
(is (thrown? :default (case 5 1 :one)) "with no default, an unmatched case throws")
