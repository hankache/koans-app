(* title: Results *)
(* intro: `('a, 'e) result` is either `Ok x` or `Error e`: an option that says why it failed. *)
let parse_age s = match int_of_string_opt s with
  | None -> Error ("not a number: " ^ s)
  | Some n when n < 0 -> Error "negative"
  | Some n -> Ok n
let age = result int string
let () = check age "a valid age" ___ (parse_age "36")
let () = check age "not a number" ___ (parse_age "x")
let () = check age "negative" ___ (parse_age "-3")
