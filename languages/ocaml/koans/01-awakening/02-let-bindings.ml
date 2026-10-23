(* title: Let bindings *)
(* intro: `let` gives a name to a value. Names can't change: a second `let` with the same name makes a new binding that hides the old one. *)
let x = 10
let y = x * 2
let () = check int "a name for a value" ___ y
let x = 3
let () = check int "a new x hides the old one" ___ x
let () = check int "y was computed with the old x" ___ y
let () = check int "let … in names a value for one expression" ___ (let a = 3 in a + 4)
