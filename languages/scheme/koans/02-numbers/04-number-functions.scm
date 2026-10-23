;; title: Number functions
;; intro: `expt` raises to a power, `gcd` and `lcm` find the greatest common divisor and the least common multiple, and `number->string` and `string->number` convert, in any base.
(test-equal "expt" ___ (expt 2 10))
(test-equal "gcd" ___ (gcd 12 18))
(test-equal "lcm" ___ (lcm 4 6))
(test-equal "number->string" ___ (number->string 42))
(test-equal "in base 2" ___ (number->string 10 2))
(test-equal "string->number gives #f for anything else" ___ (string->number "forty"))
