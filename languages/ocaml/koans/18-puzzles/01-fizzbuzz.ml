(* title: FizzBuzz *)
(* intro: The classic: count from 1, but say "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for both. *)
let fizzbuzz n = match n mod 3, n mod 5 with
  | 0, 0 -> "FizzBuzz"
  | 0, _ -> "Fizz"
  | _, 0 -> "Buzz"
  | _ -> string_of_int n
let () = check string "a multiple of both" ___ (fizzbuzz 30)
let () = check (list string) "the first five" ___ (List.init 5 (fun i -> fizzbuzz (i + 1)))
