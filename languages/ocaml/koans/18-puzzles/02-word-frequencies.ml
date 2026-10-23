(* title: Word frequencies *)
(* intro: Counting words with a `Hashtbl`, then sorting the counts. *)
let frequencies text =
  let table = Hashtbl.create 16 in
  String.split_on_char ' ' text
  |> List.iter (fun w -> Hashtbl.replace table w (1 + Option.value ~default:0 (Hashtbl.find_opt table w)));
  Hashtbl.fold (fun w n acc -> (w, n) :: acc) table [] |> List.sort compare
let counts = frequencies "the cat and the hat and the bat"
let () = check (option int) "how often the appears" ___ (List.assoc_opt "the" counts)
let () = check int "how many different words" ___ (List.length counts)
let () = check (pair string int) "the first, alphabetically" ___ (List.hd counts)
