;; title: Collections never change
;; intro: Collections are immutable: `conj`, `assoc` and the rest return a new collection and leave the old one as it was.
(def v [1 2 3])
(is (= ___ (conj v 4)) "a new vector")
(is (= ___ v) "v itself is unchanged")
(is (= ___ (pop v)) "pop leaves out the last item")
(is (= ___ (count v)) "still three")
(is (= ___ (into [0] v)) "into pours one collection into another")
