let area ~width ~height = width * height
let join ?(sep = ", ") items = String.concat sep items
let () = check int "labeled arguments" 12 (area ~width:3 ~height:4)
let () = check int "in any order" 12 (area ~height:4 ~width:3)
let () = check string "the default separator" "a, b" (join ["a"; "b"])
let () = check string "overridden" "a|b" (join ~sep:"|" ["a"; "b"])
