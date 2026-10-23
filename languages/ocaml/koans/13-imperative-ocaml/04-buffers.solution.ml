let b = Buffer.create 16
let () = Buffer.add_string b "Hello"
let () = Buffer.add_char b ','
let () = Buffer.add_string b " world"
let () = check string "Buffer.contents" "Hello, world" (Buffer.contents b)
let () = check int "Buffer.length" 12 (Buffer.length b)
