let (a, b) = (1, "one")
let swap (x, y) = (y, x)
let () = check int "the first part" 1 a
let () = check string "the second" "one" b
let () = check (pair string int) "a pattern as a parameter" ("x", 5) (swap (5, "x"))
let () = check int "_ ignores a part" 3 (let (_, n, _) = ("a", 3, true) in n)
