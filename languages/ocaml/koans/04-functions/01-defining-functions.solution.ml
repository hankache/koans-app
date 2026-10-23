let square x = x * x
let add a b = a + b
let () = check int "apply by putting the argument after" 25 (square 5)
let () = check int "two arguments" 7 (add 3 4)
let () = check int "parentheses group, they don't call" 36 (square (add 2 4))
let () = check int "application binds tighter than +" 26 (square 5 + 1)
