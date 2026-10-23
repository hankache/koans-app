module IntSet = Set.Make (Int)
let s = IntSet.of_list [3; 1; 2; 3]
let () = check (list int) "sorted, once each" [1; 2; 3] (IntSet.elements s)
let () = check bool "mem" true (IntSet.mem 2 s)
let () = check (list int) "union" [1; 2; 3; 4] (IntSet.elements (IntSet.union s (IntSet.of_list [4])))
let () = check (list int) "inter" [2] (IntSet.elements (IntSet.inter s (IntSet.of_list [2; 9])))
