let x = 10
let y = x * 2
let () = check int "a name for a value" 20 y
let x = 3
let () = check int "a new x hides the old one" 3 x
let () = check int "y was computed with the old x" 20 y
let () = check int "let … in names a value for one expression" 7 (let a = 3 in a + 4)
