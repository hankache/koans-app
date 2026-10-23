let describe n = match n with
  | 0 -> "zero"
  | 1 -> "one"
  | _ -> "many"
let () = check string "the first pattern that matches" "zero" (describe 0)
let () = check string "the next" "one" (describe 1)
let () = check string "_ matches anything" "many" (describe 7)
