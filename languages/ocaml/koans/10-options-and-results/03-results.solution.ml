let parse_age s = match int_of_string_opt s with
  | None -> Error ("not a number: " ^ s)
  | Some n when n < 0 -> Error "negative"
  | Some n -> Ok n
let age = result int string
let () = check age "a valid age" (Ok 36) (parse_age "36")
let () = check age "not a number" (Error "not a number: x") (parse_age "x")
let () = check age "negative" (Error "negative") (parse_age "-3")
