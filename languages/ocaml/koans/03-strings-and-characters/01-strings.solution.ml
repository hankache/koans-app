let s = "hello"
let () = check int "String.length" 5 (String.length s)
let () = check string "String.sub: a start and a length" "ell" (String.sub s 1 3)
let () = check char "s.[i] takes a character" 'o' s.[4]
let () = check string "String.uppercase_ascii" "HELLO" (String.uppercase_ascii s)
let () = check string "String.make repeats a character" "---" (String.make 3 '-')
