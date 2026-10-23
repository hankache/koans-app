let rec sum = function
  | [] -> 0
  | x :: rest -> x + sum rest
let first_two = function
  | a :: b :: _ -> Some (a, b)
  | _ -> None
let () = check int "sum, by matching" 6 (sum [1; 2; 3])
let () = check (option (pair int int)) "two items" (Some (1, 2)) (first_two [1; 2; 3])
let () = check (option (pair int int)) "not enough" None (first_two [1])
