type color = Red | Green | Blue
let to_string = function Red -> "red" | Green -> "green" | Blue -> "blue"
let next = function Red -> Green | Green -> Blue | Blue -> Red
let () = check string "a match on a variant" "green" (to_string Green)
let () = check string "from one case to the next" "blue" (to_string (next Green))
let () = check bool "constructors compare" true (next Blue = Red)
