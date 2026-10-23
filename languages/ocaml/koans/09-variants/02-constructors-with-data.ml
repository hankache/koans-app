(* title: Constructors with data *)
(* intro: A constructor can carry data, of its own type for each case. A match takes the data out. *)
type shape = Circle of float | Rectangle of float * float | Square of float
let area = function
  | Circle r -> 3.0 *. r *. r
  | Rectangle (w, h) -> w *. h
  | Square s -> s *. s
let close = Alcotest.float 1e-9
let () = check close "a rectangle" ___ (area (Rectangle (2.0, 3.0)))
let () = check close "a square" ___ (area (Square 4.0))
let () = check close "a circle, with pi as 3" ___ (area (Circle 2.0))
