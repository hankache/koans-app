type person = { name : string; age : int }
let ada = { name = "Ada"; age = 36 }
let older = { ada with age = ada.age + 1 }
let () = check int "the copy's age" 37 older.age
let () = check int "the original's" 36 ada.age
let () = check string "the other fields are copied" "Ada" older.name
let greet { name; _ } = "Hello, " ^ name
let () = check string "a record pattern" "Hello, Ada" (greet ada)
