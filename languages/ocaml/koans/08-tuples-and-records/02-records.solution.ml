type point = { x : int; y : int }
let p = { x = 3; y = 4 }
let () = check int "a field" 3 p.x
let () = check int "another" 4 p.y
let () = check int "fields in any order" 4 { y = 4; x = 3 }.y
let () = check bool "records with equal fields are equal" true (p = { x = 3; y = 4 })
