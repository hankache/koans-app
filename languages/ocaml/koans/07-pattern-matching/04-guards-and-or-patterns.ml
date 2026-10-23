(* title: Guards and or-patterns *)
(* intro: `when` adds a condition to a pattern. `p1 | p2` matches either, and `as` names the whole of what matched. *)
let sign = function
  | 0 -> "zero"
  | n when n < 0 -> "negative"
  | _ -> "positive"
let is_vowel = function 'a' | 'e' | 'i' | 'o' | 'u' -> true | _ -> false
let () = check string "a guard" ___ (sign (-4))
let () = check string "past the guard" ___ (sign 4)
let () = check bool "an or-pattern" ___ (is_vowel 'e')
let () = check (pair int (list int)) "as names the whole" ___ (match [1; 2] with (x :: _) as all -> (x, all) | [] -> (0, []))
