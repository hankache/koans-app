(* title: References *)
(* intro: A `ref` is a box whose content can change: `!r` reads it, `r := v` replaces it, and `incr` adds one. *)
let r = ref 10
let () = r := !r + 5
let () = check int "! reads, := writes" ___ !r
let () = incr r
let () = check int "incr" ___ !r
let alias = r
let () = alias := 0
let () = check int "two names, one box" ___ !r
