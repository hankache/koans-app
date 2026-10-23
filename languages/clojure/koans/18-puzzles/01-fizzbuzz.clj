;; title: FizzBuzz
;; intro: The classic: count from 1, but say "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for both. Read this version and predict what it says.
(defn fizzbuzz [n]
  (cond (zero? (mod n 15)) "FizzBuzz"
        (zero? (mod n 3)) "Fizz"
        (zero? (mod n 5)) "Buzz"
        :else (str n)))
(is (= ___ (fizzbuzz 9)) "a multiple of 3")
(is (= ___ (fizzbuzz 10)) "a multiple of 5")
(is (= ___ (fizzbuzz 30)) "a multiple of both")
(is (= ___ (fizzbuzz 7)) "neither: the number itself")
(is (= ___ (map fizzbuzz (range 1 6))) "the first five")
