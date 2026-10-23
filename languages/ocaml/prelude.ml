(* Run before every koan. The build drops these comment lines and joins the rest onto ONE line, so *)
(* error line numbers shift by exactly one; OCaml doesn't need newlines between items. *)
(* Comments here must each sit on a line of their own, like these. *)
(* *)
(* Alcotest's check and check_raises, as OCaml code is tested: (check int) "why" expected actual. *)
(* Unlike Alcotest's, they print TAP, so every blank is checked: a failing check reports itself, *)
(* with the learner's line as "# at web line N", and the koan carries on. *)
(* *)
(* The worker (public/runtime/ocaml/worker.js) runs the koan one top-level item at a time, setting *)
(* Alcotest.line to the item's line first, and rewrites it before it runs without moving a line: *)
(* each ___ becomes (Obj.magic Alcotest.blank), a value check recognizes, and each check and *)
(* check_raises learns its own line. The toplevel keeps standard output and standard error apart, *)
(* so diagnostics go to standard output, each line marked with character 1 for the worker to move. *)

#warnings "-a";;

module Alcotest = struct
  type 'a testable = { pp : 'a -> string; equal : 'a -> 'a -> bool }

  (* A blank: never equal to anything a koan computes. *)
  let blank = ref ()
  let is_blank x = Obj.repr x == Obj.repr blank
  let line = ref 0
  let tests = ref 0

  let report ok message at diagnostics =
    incr tests;
    print_string ((if ok then "ok " else "not ok ") ^ string_of_int !tests ^ (if message = "" then "" else " - " ^ message) ^ "\n");
    if not ok then begin
      List.iter (fun d -> print_string ("\001# " ^ d ^ "\n")) diagnostics;
      print_string ("\001# at web line " ^ string_of_int at ^ "\n")
    end;
    flush stdout

  let testable pp equal = { pp = Format.asprintf "%a" pp; equal }
  let parens s = if (String.contains s ' ' || s.[0] = '-') && not (List.mem s.[0] [ '['; '('; '"' ]) then "(" ^ s ^ ")" else s
  let int = { pp = string_of_int; equal = Int.equal }
  let bool = { pp = string_of_bool; equal = ( = ) }
  let string = { pp = Printf.sprintf "%S"; equal = String.equal }
  let char = { pp = Printf.sprintf "%C"; equal = Char.equal }
  let unit = { pp = (fun () -> "()"); equal = (fun () () -> true) }
  let float epsilon = { pp = Printf.sprintf "%F"; equal = (fun a b -> Float.abs (a -. b) <= epsilon) }
  let list t = { pp = (fun l -> "[" ^ String.concat "; " (List.map t.pp l) ^ "]"); equal = List.equal t.equal }
  let array t = { pp = (fun a -> "[|" ^ String.concat "; " (List.map t.pp (Array.to_list a)) ^ "|]"); equal = (fun a b -> Array.length a = Array.length b && Array.for_all2 t.equal a b) }
  let option t = { pp = (function None -> "None" | Some x -> "Some " ^ parens (t.pp x)); equal = Option.equal t.equal }
  let result o e = { pp = (function Ok x -> "Ok " ^ parens (o.pp x) | Error x -> "Error " ^ parens (e.pp x)); equal = Result.equal ~ok:o.equal ~error:e.equal }
  let pair a b = { pp = (fun (x, y) -> "(" ^ a.pp x ^ ", " ^ b.pp y ^ ")"); equal = (fun (x, y) (x', y') -> a.equal x x' && b.equal y y') }
  let triple a b c = { pp = (fun (x, y, z) -> "(" ^ a.pp x ^ ", " ^ b.pp y ^ ", " ^ c.pp z ^ ")"); equal = (fun (x, y, z) (x', y', z') -> a.equal x x' && b.equal y y' && c.equal z z') }

  let check_at at t message expected actual =
    if is_blank expected then report false message at []
    else
      match t.equal expected actual with
      | true -> report true message at []
      | false -> report false message at [ "expected: " ^ t.pp expected; "     got: " ^ t.pp actual ]
      | exception e -> report false message at [ "it raised: " ^ Printexc.to_string e ]

  let check_raises_at at message expected f =
    if is_blank expected then report false message at []
    else
      match f () with
      | _ -> report false message at [ "expected: " ^ Printexc.to_string expected; "     got: no exception" ]
      | exception e when e = expected -> report true message at []
      | exception e -> report false message at [ "expected: " ^ Printexc.to_string expected; "     got: " ^ Printexc.to_string e ]

  let check t message expected actual = check_at !line t message expected actual
  let check_raises message expected f = check_raises_at !line message expected f
  let fail message = report false message !line []
end

(* Alcotest's testables, opened as Alcotest.(check int) opens them; all but float, which would hide Stdlib's float. *)
let check, check_raises, fail = Alcotest.(check, check_raises, fail)
let int, bool, string, char, unit = Alcotest.(int, bool, string, char, unit)
let list, array, option, result, pair, triple = Alcotest.(list, array, option, result, pair, triple)
