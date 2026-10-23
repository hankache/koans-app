(* title: Strings *)
(* intro: `^` joins strings, `String.length` measures one, `String.sub s start length` cuts a piece out, and `s.[i]` takes a character, counting from 0. *)
let s = "hello"
let () = check int "String.length" ___ (String.length s)
let () = check string "String.sub: a start and a length" ___ (String.sub s 1 3)
let () = check char "s.[i] takes a character" ___ s.[4]
let () = check string "String.uppercase_ascii" ___ (String.uppercase_ascii s)
let () = check string "String.make repeats a character" ___ (String.make 3 '-')
