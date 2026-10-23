let runs = ref 0
let v = lazy (incr runs; 42)
let () = check int "nothing has run yet" 0 !runs
let () = check int "force computes it" 42 (Lazy.force v)
let () = check int "and remembers" 42 (Lazy.force v)
let () = check int "it ran only once" 1 !runs
