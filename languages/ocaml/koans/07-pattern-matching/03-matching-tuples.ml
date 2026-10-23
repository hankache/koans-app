(* title: Matching tuples *)
(* intro: A tuple pattern matches several values at once, which makes a decision table easy to read. *)
let fizz n = match n mod 3, n mod 5 with
  | 0, 0 -> "FizzBuzz"
  | 0, _ -> "Fizz"
  | _, 0 -> "Buzz"
  | _ -> string_of_int n
let () = check string "both zero" ___ (fizz 15)
let () = check string "the first" ___ (fizz 9)
let () = check string "the second" ___ (fizz 10)
let () = check string "neither" ___ (fizz 7)
