;; title: Atoms
;; intro: An atom holds a value that can change. `@` reads it, `swap!` applies a function to it, and `reset!` replaces it.
(def counter (atom 0))
(swap! counter inc)
(swap! counter + 10)
(is (= ___ @counter) "swap! applies a function, with any extra arguments")
(reset! counter 100)
(is (= ___ @counter) "reset! replaces the value")
(is (= ___ (swap! counter inc)) "swap! returns the new value")
(def todos (atom []))
(swap! todos conj "write koans")
(is (= ___ @todos) "an atom can hold any value")
