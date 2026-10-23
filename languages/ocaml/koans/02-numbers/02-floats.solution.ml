let close = Alcotest.float 1e-9
let () = check close "/. divides floats" 3.5 (7.0 /. 2.0)
let () = check close "** raises to a power" 8.0 (2.0 ** 3.0)
let () = check close "sqrt" 3.0 (sqrt 9.0)
let () = check close "floor" 2.0 (floor 2.7)
let () = check bool "0.1 +. 0.2 isn't quite 0.3" false (0.1 +. 0.2 = 0.3)
