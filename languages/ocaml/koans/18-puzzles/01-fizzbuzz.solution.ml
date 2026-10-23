let fizzbuzz n = match n mod 3, n mod 5 with
  | 0, 0 -> "FizzBuzz"
  | 0, _ -> "Fizz"
  | _, 0 -> "Buzz"
  | _ -> string_of_int n
let () = check string "a multiple of both" "FizzBuzz" (fizzbuzz 30)
let () = check (list string) "the first five" ["1"; "2"; "Fizz"; "4"; "Buzz"] (List.init 5 (fun i -> fizzbuzz (i + 1)))
