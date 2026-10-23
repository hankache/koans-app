let sign = function
  | 0 -> "zero"
  | n when n < 0 -> "negative"
  | _ -> "positive"
let is_vowel = function 'a' | 'e' | 'i' | 'o' | 'u' -> true | _ -> false
let () = check string "a guard" "negative" (sign (-4))
let () = check string "past the guard" "positive" (sign 4)
let () = check bool "an or-pattern" true (is_vowel 'e')
let () = check (pair int (list int)) "as names the whole" (1, [1; 2]) (match [1; 2] with (x :: _) as all -> (x, all) | [] -> (0, []))
