(* title: Floats *)
(* intro: Floats have their own operators, ending in a dot: `+.`, `-.`, `*.`, `/.`, and `**` for powers. A float literal needs a dot too: `2.` or `2.0`. *)
let close = Alcotest.float 1e-9
let () = check close "/. divides floats" ___ (7.0 /. 2.0)
let () = check close "** raises to a power" ___ (2.0 ** 3.0)
let () = check close "sqrt" ___ (sqrt 9.0)
let () = check close "floor" ___ (floor 2.7)
let () = check bool "0.1 +. 0.2 isn't quite 0.3" ___ (0.1 +. 0.2 = 0.3)
