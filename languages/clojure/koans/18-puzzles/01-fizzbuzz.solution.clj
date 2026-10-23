(defn fizzbuzz [n]
  (cond (zero? (mod n 15)) "FizzBuzz"
        (zero? (mod n 3)) "Fizz"
        (zero? (mod n 5)) "Buzz"
        :else (str n)))
(is (= "Fizz" (fizzbuzz 9)) "a multiple of 3")
(is (= "Buzz" (fizzbuzz 10)) "a multiple of 5")
(is (= "FizzBuzz" (fizzbuzz 30)) "a multiple of both")
(is (= "7" (fizzbuzz 7)) "neither: the number itself")
(is (= ["1" "2" "Fizz" "4" "Buzz"] (map fizzbuzz (range 1 6))) "the first five")
