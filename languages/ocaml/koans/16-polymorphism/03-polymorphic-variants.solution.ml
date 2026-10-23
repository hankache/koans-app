let name = function `Red -> "red" | `Green -> "green"
let to_rgb = function `Red -> (255, 0, 0) | `Green -> (0, 255, 0) | `Blue -> (0, 0, 255)
let () = check string "no type defined" "red" (name `Red)
let () = check (triple int int int) "another function, more tags" (0, 0, 255) (to_rgb `Blue)
let () = check bool "tags compare" true (`Green = `Green)
