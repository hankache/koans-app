(* title: Hash tables *)
(* intro: `Hashtbl` is a mutable table, changed in place: `replace` sets a key's value, and `find_opt` looks one up. *)
let table = Hashtbl.create 16
let () = Hashtbl.replace table "tea" 4
let () = Hashtbl.replace table "jam" 3
let () = Hashtbl.replace table "tea" 5
let () = check (option int) "replace overwrote the value" ___ (Hashtbl.find_opt table "tea")
let () = check int "two keys" ___ (Hashtbl.length table)
let () = Hashtbl.remove table "jam"
let () = check bool "removed" ___ (Hashtbl.mem table "jam")
