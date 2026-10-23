(* title: Sets *)
(* intro: `Set.Make` builds a set module for a type. Sets keep their elements sorted, once each, and are immutable. *)
module IntSet = Set.Make (Int)
let s = IntSet.of_list [3; 1; 2; 3]
let () = check (list int) "sorted, once each" ___ (IntSet.elements s)
let () = check bool "mem" ___ (IntSet.mem 2 s)
let () = check (list int) "union" ___ (IntSet.elements (IntSet.union s (IntSet.of_list [4])))
let () = check (list int) "inter" ___ (IntSet.elements (IntSet.inter s (IntSet.of_list [2; 9])))
