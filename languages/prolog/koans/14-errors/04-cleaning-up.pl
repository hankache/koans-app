% title: Cleaning up
% intro: `setup_call_cleanup(Setup, Goal, Cleanup)` runs the cleanup whatever happens to the goal: success, failure, or an exception.
:- dynamic log/1.
note(X) :- assertz(log(X)).
:- begin_tests(cleaning_up).
test('cleanup after success', L == ___) :- retractall(log(_)), setup_call_cleanup(note(open), note(work), note(close)), findall(X, log(X), L).
test('and after an exception', L == ___) :- retractall(log(_)), catch(setup_call_cleanup(note(open), throw(oops), note(close)), oops, true), findall(X, log(X), L).
:- end_tests(cleaning_up).
