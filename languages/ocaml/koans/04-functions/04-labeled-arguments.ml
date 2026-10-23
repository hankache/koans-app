(* title: Labeled and optional arguments *)
(* intro: A labeled argument is passed by name, `~width:3`, in any order. An optional one, `?(sep = ", ")`, has a default that a caller can override. *)
let area ~width ~height = width * height
let join ?(sep = ", ") items = String.concat sep items
let () = check int "labeled arguments" ___ (area ~width:3 ~height:4)
let () = check int "in any order" ___ (area ~height:4 ~width:3)
let () = check string "the default separator" ___ (join ["a"; "b"])
let () = check string "overridden" ___ (join ~sep:"|" ["a"; "b"])
