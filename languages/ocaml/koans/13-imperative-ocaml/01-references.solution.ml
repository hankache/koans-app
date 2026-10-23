let r = ref 10
let () = r := !r + 5
let () = check int "! reads, := writes" 15 !r
let () = incr r
let () = check int "incr" 16 !r
let alias = r
let () = alias := 0
let () = check int "two names, one box" 0 !r
