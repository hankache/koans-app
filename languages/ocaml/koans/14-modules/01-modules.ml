(* title: Modules *)
(* intro: `module Name = struct … end` groups definitions. Outside, they're reached with a dot, or all at once with `open`, or for one expression with `Name.( … )`. *)
module Geometry = struct
  let pi = 3
  let circle_area r = pi * r * r
end
let () = check int "reached with a dot" ___ (Geometry.circle_area 2)
let () = check int "a local open" ___ Geometry.(pi)
let () = check int "let open … in" ___ (let open Geometry in circle_area pi)
