(def numerals [[1000 "M"] [900 "CM"] [500 "D"] [400 "CD"] [100 "C"] [90 "XC"] [50 "L"] [40 "XL"] [10 "X"] [9 "IX"] [5 "V"] [4 "IV"] [1 "I"]])
(defn roman [n]
  (loop [n n out ""]
    (if (zero? n)
      out
      (let [[value letters] (first (filter #(<= (first %) n) numerals))]
        (recur (- n value) (str out letters))))))
(is (= "IV" (roman 4)) "one before five")
(is (= "XLII" (roman 42)) "forty-two")
(is (= "MCMXC" (roman 1990)) "1990")
(is (= "MMXXVI" (roman 2026)) "this year")
