let table = Hashtbl.create 16
let () = Hashtbl.replace table "tea" 4
let () = Hashtbl.replace table "jam" 3
let () = Hashtbl.replace table "tea" 5
let () = check (option int) "replace overwrote the value" (Some 5) (Hashtbl.find_opt table "tea")
let () = check int "two keys" 2 (Hashtbl.length table)
let () = Hashtbl.remove table "jam"
let () = check bool "removed" false (Hashtbl.mem table "jam")
