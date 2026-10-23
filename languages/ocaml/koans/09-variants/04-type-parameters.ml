(* title: Type parameters *)
(* intro: A type can take a parameter: `'a tree` is a tree of anything, and the same functions work whatever `'a` is. *)
type 'a tree = Leaf | Node of 'a tree * 'a * 'a tree
let rec insert x = function
  | Leaf -> Node (Leaf, x, Leaf)
  | Node (l, v, r) as t -> if x < v then Node (insert x l, v, r) else if x > v then Node (l, v, insert x r) else t
let rec to_list = function Leaf -> [] | Node (l, v, r) -> to_list l @ [v] @ to_list r
let rec size = function Leaf -> 0 | Node (l, _, r) -> size l + 1 + size r
let numbers = List.fold_left (fun t x -> insert x t) Leaf [5; 2; 8; 2; 1]
let () = check (list int) "a search tree keeps them sorted, once each" ___ (to_list numbers)
let () = check int "its size" ___ (size numbers)
let () = check (list string) "the same tree type, for strings" ___ (to_list (insert "a" (insert "b" Leaf)))
