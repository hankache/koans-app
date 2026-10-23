(* title: Matching lists *)
(* intro: A list pattern takes a list apart: `[]` matches the empty list, and `x :: rest` its first item and the rest. Recursion and matching go together. *)
let rec sum = function
  | [] -> 0
  | x :: rest -> x + sum rest
let first_two = function
  | a :: b :: _ -> Some (a, b)
  | _ -> None
let () = check int "sum, by matching" ___ (sum [1; 2; 3])
let () = check (option (pair int int)) "two items" ___ (first_two [1; 2; 3])
let () = check (option (pair int int)) "not enough" ___ (first_two [1])
