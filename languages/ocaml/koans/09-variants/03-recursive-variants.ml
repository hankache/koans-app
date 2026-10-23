(* title: Recursive variants *)
(* intro: A variant can refer to itself, which makes trees easy to define. Here an expression tree, and a function that evaluates it. *)
type expr = Num of int | Add of expr * expr | Mul of expr * expr
let rec eval = function
  | Num n -> n
  | Add (a, b) -> eval a + eval b
  | Mul (a, b) -> eval a * eval b
let () = check int "a number" ___ (eval (Num 7))
let () = check int "2 + 3" ___ (eval (Add (Num 2, Num 3)))
let () = check int "(2 + 3) * 4" ___ (eval (Mul (Add (Num 2, Num 3), Num 4)))
