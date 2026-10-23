;; title: Hierarchies
;; intro: `derive` says that one keyword is a kind of another, and multimethods follow it: a method for the parent handles its children, unless a child has its own.
(derive ::dog ::animal)
(derive ::cat ::animal)
(defmulti sound identity)
(defmethod sound ::animal [_] "some sound")
(defmethod sound ::cat [_] "meow")
(is (= ___ (isa? ::dog ::animal)) "isa? follows derive")
(is (= ___ (sound ::dog)) "the parent's method")
(is (= ___ (sound ::cat)) "the most specific method wins")
(is (= ___ (parents ::dog)) "parents")
