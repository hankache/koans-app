(* title: Buffers *)
(* intro: Strings are immutable, so building a long one piece by piece is done with a `Buffer`. *)
let b = Buffer.create 16
let () = Buffer.add_string b "Hello"
let () = Buffer.add_char b ','
let () = Buffer.add_string b " world"
let () = check string "Buffer.contents" ___ (Buffer.contents b)
let () = check int "Buffer.length" ___ (Buffer.length b)
