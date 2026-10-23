(* title: Quicksort *)
(* intro: Quicksort in a few lines: take the first item as a pivot, and sort what's smaller and what's not on either side of it. *)
let rec quicksort = function
  | [] -> []
  | pivot :: rest ->
    let smaller, larger = List.partition (fun x -> x < pivot) rest in
    quicksort smaller @ [pivot] @ quicksort larger
let () = check (list int) "sorted" ___ (quicksort [5; 3; 8; 1; 2])
let () = check (list string) "any type with an order" ___ (quicksort ["pear"; "fig"; "kiwi"])
