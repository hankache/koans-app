(* title: Match *)
(* intro: `match x with | p1 -> e1 | p2 -> e2` tries the patterns in order and gives the value of the first that matches. `_` matches anything. *)
let describe n = match n with
  | 0 -> "zero"
  | 1 -> "one"
  | _ -> "many"
let () = check string "the first pattern that matches" ___ (describe 0)
let () = check string "the next" ___ (describe 1)
let () = check string "_ matches anything" ___ (describe 7)
