(* title: Updating records *)
(* intro: Records are immutable: `{ p with x = 10 }` makes a copy with one field changed, and leaves `p` as it was. A pattern can take a record apart. *)
type person = { name : string; age : int }
let ada = { name = "Ada"; age = 36 }
let older = { ada with age = ada.age + 1 }
let () = check int "the copy's age" ___ older.age
let () = check int "the original's" ___ ada.age
let () = check string "the other fields are copied" ___ older.name
let greet { name; _ } = "Hello, " ^ name
let () = check string "a record pattern" ___ (greet ada)
