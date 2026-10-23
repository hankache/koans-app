let () = check int "check compares two values" 2 (1 + 1)
let () = check string "^ joins strings" "OCaml" ("OC" ^ "aml")
let () = check bool "a comparison gives a bool" false (1 > 2)
let () = check char "a character is in single quotes" 'a' (String.get "abc" 0)
let () = check (list int) "and a list of ints" [1; 2; 3] [1; 2; 3]
