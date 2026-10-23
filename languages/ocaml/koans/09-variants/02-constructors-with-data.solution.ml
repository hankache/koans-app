type shape = Circle of float | Rectangle of float * float | Square of float
let area = function
  | Circle r -> 3.0 *. r *. r
  | Rectangle (w, h) -> w *. h
  | Square s -> s *. s
let close = Alcotest.float 1e-9
let () = check close "a rectangle" 6.0 (area (Rectangle (2.0, 3.0)))
let () = check close "a square" 16.0 (area (Square 4.0))
let () = check close "a circle, with pi as 3" 12.0 (area (Circle 2.0))
