(* title: Polymorphic variants *)
(* intro: A polymorphic variant, `` `Red ``, needs no type definition: its tag is enough, and functions can share tags across types. *)
let name = function `Red -> "red" | `Green -> "green"
let to_rgb = function `Red -> (255, 0, 0) | `Green -> (0, 255, 0) | `Blue -> (0, 0, 255)
let () = check string "no type defined" ___ (name `Red)
let () = check (triple int int int) "another function, more tags" ___ (to_rgb `Blue)
let () = check bool "tags compare" ___ (`Green = `Green)
