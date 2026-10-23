;; title: Division and remainders
;; intro: `quot` divides and drops the remainder, rounding toward zero. `rem` is the remainder, with the sign of the number divided; `mod` has the sign of the divisor.
(is (= ___ (quot 7 2)) "quot drops the remainder")
(is (= ___ (rem 7 2)) "rem is the remainder")
(is (= ___ (quot -7 2)) "quot rounds toward zero")
(is (= ___ (rem -7 2)) "rem takes the sign of the number divided")
(is (= ___ (mod -7 2)) "mod takes the sign of the divisor")
(is (= ___ (zero? (mod 15 5))) "a remainder of zero means it divides exactly")
