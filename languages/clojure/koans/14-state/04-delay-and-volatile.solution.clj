(def computed (atom 0))
(def d (delay (swap! computed inc) :ready))
(is (= 0 @computed) "nothing computed yet")
(is (= :ready @d) "reading it computes it")
@d
(is (= 1 @computed) "but only once")
(def v (volatile! 1))
(vswap! v * 10)
(is (= 10 @v) "vswap! works like swap!")
