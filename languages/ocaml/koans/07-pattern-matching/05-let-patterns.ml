(* title: Patterns in let *)
(* intro: A `let` can take a value apart too, when the pattern can't fail, as with a tuple. Function parameters can be patterns. *)
let (a, b) = (1, "one")
let swap (x, y) = (y, x)
let () = check int "the first part" ___ a
let () = check string "the second" ___ b
let () = check (pair string int) "a pattern as a parameter" ___ (swap (5, "x"))
let () = check int "_ ignores a part" ___ (let (_, n, _) = ("a", 3, true) in n)
