;; title: Delay and volatile
;; intro: `delay` computes its value only when first read with `@`, then remembers it. `volatile!` is a lighter box for state inside a single function.
(def computed (atom 0))
(def d (delay (swap! computed inc) :ready))
(is (= ___ @computed) "nothing computed yet")
(is (= ___ @d) "reading it computes it")
@d
(is (= ___ @computed) "but only once")
(def v (volatile! 1))
(vswap! v * 10)
(is (= ___ @v) "vswap! works like swap!")
