(* title: Records *)
(* intro: A record type names its fields: `type point = { x : int; y : int }`. A record is built with braces, and a field read with a dot. *)
type point = { x : int; y : int }
let p = { x = 3; y = 4 }
let () = check int "a field" ___ p.x
let () = check int "another" ___ p.y
let () = check int "fields in any order" ___ { y = 4; x = 3 }.y
let () = check bool "records with equal fields are equal" ___ (p = { x = 3; y = 4 })
