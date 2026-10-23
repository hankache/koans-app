let fizz n = match n mod 3, n mod 5 with
  | 0, 0 -> "FizzBuzz"
  | 0, _ -> "Fizz"
  | _, 0 -> "Buzz"
  | _ -> string_of_int n
let () = check string "both zero" "FizzBuzz" (fizz 15)
let () = check string "the first" "Fizz" (fizz 9)
let () = check string "the second" "Buzz" (fizz 10)
let () = check string "neither" "7" (fizz 7)
