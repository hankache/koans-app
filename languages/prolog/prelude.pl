% Run before every koan. The build drops these comment lines and joins the rest onto ONE line, so
% error line numbers shift by exactly one; Prolog doesn't need newlines between clauses.
% Never put a % comment at the end of a code line: the join would comment out the rest.
%
% plunit's tests, as Prolog code is tested: test(Name, Option) :- Goal, between
% :- begin_tests(Unit) and :- end_tests(Unit). Unlike plunit's, they print TAP, so every blank
% is checked: a failing test reports itself, with the learner's line as "# at web line N", and
% the koan carries on.
%
% Each test clause is turned into a koan_test/5 fact as it's loaded, with its line and whether
% it holds a blank, ___ (a variable to Prolog, recognized by its name). The worker
% (public/runtime/prolog/worker.js) runs koan_run_tests after loading the koan. Diagnostics go
% to standard output, each line marked with character 1 for the worker to move to standard error.

:- set_prolog_flag(stack_limit, 268435456).
:- dynamic koan_test/5, koan_tests/1.
:- discontiguous koan_test/5.
:- style_check(-singleton).

koan_tests(0).

begin_tests(_).
begin_tests(_, _).
end_tests(_).

koan_info(Line, Blank) :- prolog_load_context(term_position, Position), stream_position_data(line_count, Position, Line), prolog_load_context(variable_names, Names), ( memberchk('___'=_, Names) -> Blank = true ; Blank = false ).

term_expansion((test(Name, Options) :- Body), koan_test(Line, Name, Options, Blank, Body)) :- koan_info(Line, Blank).
term_expansion((test(Name) :- Body), koan_test(Line, Name, true, Blank, Body)) :- koan_info(Line, Blank).
term_expansion(test(Name, Options), koan_test(Line, Name, Options, Blank, true)) :- koan_info(Line, Blank).

koan_text(Term, Text) :- copy_term(Term, Copy), numbervars(Copy, 0, _), format(string(Text), "~W", [Copy, [quoted(true), numbervars(true), portray(true), spacing(next_argument)]]).

koan_diag(Line) :- format("~c# ~w~n", [1, Line]).

koan_report(Ok, Name, Line, Diagnostics) :- retract(koan_tests(N0)), N is N0 + 1, assertz(koan_tests(N)), ( Ok == true -> Status = "ok" ; Status = "not ok" ), format("~w ~w - ~w~n", [Status, N, Name]), ( Ok == true -> true ; forall(member(D, Diagnostics), koan_diag(D)), format(string(At), "at web line ~w", [Line]), koan_diag(At) ), flush_output.

% One option: what the goal must do. Gives Ok (true or false) and the diagnostics of a failure.
koan_check(true, Goal, Ok, D) :- !, catch(( once(Goal) -> Ok = true, D = [] ; Ok = false, D = ["the goal failed"] ), E, koan_raised(E, Ok, D)).
koan_check(fail, Goal, Ok, D) :- !, koan_check(false, Goal, Ok, D).
koan_check(false, Goal, Ok, D) :- !, catch(( once(Goal) -> Ok = false, D = ["expected the goal to fail, but it succeeded"] ; Ok = true, D = [] ), E, koan_raised(E, Ok, D)).
koan_check(error(Expected), Goal, Ok, D) :- !, koan_check(throws(error(Expected, _)), Goal, Ok, D).
koan_check(throws(Expected), Goal, Ok, D) :- !, ( catch((once(Goal), Thrown = none), Thrown, true), Thrown \== none -> ( subsumes_term(Expected, Thrown) -> Ok = true, D = [] ; Ok = false, koan_expected_got(Expected, Thrown, D) ) ; Ok = false, D = ["expected an exception, but none was thrown"] ).
koan_check(all(Template), Goal, Ok, D) :- !, Template =.. [Op, X, Expected], catch(( findall(X, Goal, Xs), koan_compare(Op, Xs, Expected, Ok, D) ), E, koan_raised(E, Ok, D)).
koan_check(set(Template), Goal, Ok, D) :- !, Template =.. [Op, X, Expected], catch(( findall(X, Goal, Xs0), sort(Xs0, Xs), koan_compare(Op, Xs, Expected, Ok, D) ), E, koan_raised(E, Ok, D)).
koan_check(true(Condition), Goal, Ok, D) :- !, koan_check(Condition, Goal, Ok, D).
koan_check(Condition, Goal, Ok, D) :- compound(Condition), Condition =.. [Op, Got, Expected], memberchk(Op, [==, =, =:=, =@=, \==, \=, <, >, =<, >=]), !, catch(( once(Goal) -> koan_compare(Op, Got, Expected, Ok, D) ; Ok = false, D = ["the goal failed"] ), E, koan_raised(E, Ok, D)).
koan_check(Other, _, false, [D]) :- format(string(D), "unknown test option: ~q", [Other]).

koan_compare(Op, Got, Expected, Ok, D) :- Condition =.. [Op, Got, Expected], ( call(Condition) -> Ok = true, D = [] ; Ok = false, koan_expected_got(Expected, Got, D) ).

koan_expected_got(Expected, Got, [D1, D2]) :- koan_text(Expected, E), koan_text(Got, G), format(string(D1), "expected: ~w", [E]), format(string(D2), "     got: ~w", [G]).

koan_raised(E, false, [D]) :- koan_message(E, Text), format(string(D), "it raised: ~w", [Text]).

% An exception as SWI-Prolog words it, on one line.
koan_message(E, Text) :- catch(( '$messages':translate_message(E, Lines, []), with_output_to(string(S), print_message_lines(current_output, '', Lines)), split_string(S, "\n", " ", Parts), exclude(==(""), Parts, Kept), atomic_list_concat(Kept, ' ', Text) ), _, fail), Text \== '', !.
koan_message(E, Text) :- koan_text(E, Text).

% A test's options: one, or a list, of which nondet and blocked change nothing here.
koan_option(Options, Option) :- ( is_list(Options) -> exclude([O]>>memberchk(O, [nondet, det]), Options, Rest), ( Rest = [Option] -> true ; Rest = [] -> Option = true ; Rest = [Option|_] ) ; Option = Options ).

koan_run_test(Line, Name, _, true, _) :- !, koan_report(false, Name, Line, []).
koan_run_test(Line, Name, Options, false, Body) :- koan_option(Options, Option), ( var(Option) -> koan_report(false, Name, Line, []) ; koan_check(Option, Body, Ok, Diagnostics), koan_report(Ok, Name, Line, Diagnostics) ).

koan_run_tests :- forall(koan_test(Line, Name, Options, Blank, Body), koan_run_test(Line, Name, Options, Blank, Body)), flush_output.
