let rec quicksort = function
  | [] -> []
  | pivot :: rest ->
    let smaller, larger = List.partition (fun x -> x < pivot) rest in
    quicksort smaller @ [pivot] @ quicksort larger
let () = check (list int) "sorted" [1; 2; 3; 5; 8] (quicksort [5; 3; 8; 1; 2])
let () = check (list string) "any type with an order" ["fig"; "kiwi"; "pear"] (quicksort ["pear"; "fig"; "kiwi"])
