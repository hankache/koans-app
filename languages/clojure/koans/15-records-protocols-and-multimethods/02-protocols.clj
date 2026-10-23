;; title: Protocols
;; intro: A protocol names a group of functions. Each type implements them in its own way, and a call is dispatched on the type of its first argument.
(defprotocol Shape (area [s]) (describe [s]))
(defrecord Square [side] Shape (area [_] (* side side)) (describe [_] "a square"))
(defrecord Rect [w h] Shape (area [_] (* w h)) (describe [_] "a rectangle"))
(is (= ___ (area (->Square 3))) "Square's area")
(is (= ___ (area (->Rect 2 3))) "Rect's")
(is (= ___ (describe (->Rect 1 1))) "another function of the protocol")
(is (= ___ (map area [(->Square 2) (->Rect 2 3)])) "one call, two implementations")
(is (= ___ (satisfies? Shape (->Square 1))) "satisfies? asks whether a value implements it")
