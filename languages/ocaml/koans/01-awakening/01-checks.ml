(* title: Checks *)
(* intro: OCaml code is often tested with Alcotest: `check int "why" expected actual` passes when the two are equal, `int` saying how to compare and print them. (In Alcotest it is written `Alcotest.(check int)`; the koans open it for you.) Replace each `___` so every check passes. *)
let () = check int "check compares two values" ___ (1 + 1)
let () = check string "^ joins strings" ___ ("OC" ^ "aml")
let () = check bool "a comparison gives a bool" ___ (1 > 2)
let () = check char "a character is in single quotes" ___ (String.get "abc" 0)
let () = check (list int) "and a list of ints" ___ [1; 2; 3]
