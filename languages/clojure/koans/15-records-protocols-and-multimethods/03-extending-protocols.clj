;; title: Extending protocols
;; intro: `extend-protocol` adds a protocol to types defined elsewhere, without changing them. Even `nil` can take part.
(defprotocol Loud (shout [x]))
(defrecord Dog [name])
(defrecord Cat [name])
(extend-protocol Loud
  Dog (shout [d] (str (:name d) " barks"))
  Cat (shout [c] (str (:name c) " hisses"))
  nil (shout [_] "silence"))
(is (= ___ (shout (->Dog "Rex"))) "a dog")
(is (= ___ (shout (->Cat "Tom"))) "a cat")
(is (= ___ (shout nil)) "even nil")
(is (= ___ (satisfies? Loud 42)) "but not a number")
