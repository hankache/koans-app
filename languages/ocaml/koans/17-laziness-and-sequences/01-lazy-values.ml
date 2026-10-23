(* title: Lazy values *)
(* intro: `lazy e` delays `e`, and `Lazy.force` computes it the first time, then remembers it. *)
let runs = ref 0
let v = lazy (incr runs; 42)
let () = check int "nothing has run yet" ___ !runs
let () = check int "force computes it" ___ (Lazy.force v)
let () = check int "and remembers" ___ (Lazy.force v)
let () = check int "it ran only once" ___ !runs
