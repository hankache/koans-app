(* title: Defining functions *)
(* intro: `let square x = x * x` defines a function. A function is applied by writing its arguments after it, with no parentheses or commas: `square 5`. *)
let square x = x * x
let add a b = a + b
let () = check int "apply by putting the argument after" ___ (square 5)
let () = check int "two arguments" ___ (add 3 4)
let () = check int "parentheses group, they don't call" ___ (square (add 2 4))
let () = check int "application binds tighter than +" ___ (square 5 + 1)
