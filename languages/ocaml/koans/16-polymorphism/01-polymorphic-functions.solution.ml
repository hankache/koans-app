let first (x, _) = x
let duplicate x = [x; x]
let () = check int "first, on ints" 1 (first (1, "one"))
let () = check string "first, on strings" "a" (first ("a", 2))
let () = check (list string) "duplicate" ["hi"; "hi"] (duplicate "hi")
let () = check int "List.length doesn't look at the items" 2 (List.length [[1]; []])
