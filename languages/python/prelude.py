# Run before every koan. The build wraps all of it in one exec("…") on ONE line, so error line
# numbers shift by exactly one, and the koan runs at the top level of the same module.
#
# The assertions are named after unittest's (assertEqual → assert_equal), and like Raku's Test
# module they print TAP: a failing assertion reports itself and the koan carries on, so every
# blank can be checked. Each failure also reports the learner's line as "# at web line N".

import sys as _sys


class _Blank:
    """___: a unique value. Any assertion given it fails, whatever the assertion."""

    def __repr__(self):
        return "___"


___ = _Blank()

_tests = 0


def _learner_line():
    # This prelude's functions come from exec(), so they're in "<string>"; the koan isn't.
    frame = _sys._getframe(1)
    while frame is not None and frame.f_code.co_filename == "<string>":
        frame = frame.f_back
    return frame.f_lineno if frame is not None else 0


def _report(ok, msg, diag=()):
    global _tests
    _tests += 1
    print(("ok " if ok else "not ok ") + str(_tests) + (" - " + msg if msg else ""), flush=True)
    if not ok:
        for line in diag:
            print("# " + line, file=_sys.stderr, flush=True)
        print("# at web line %d" % _learner_line(), file=_sys.stderr, flush=True)
    return ok


def _check(test, args, msg):
    if any(a is ___ for a in args):
        return _report(False, msg)
    return test()


def _show(value):
    # Classes by name (ValueError, not <class 'ValueError'>), everything else as Python writes it.
    if isinstance(value, type):
        return value.__name__
    if isinstance(value, tuple) and value and all(isinstance(v, type) for v in value):
        return "(" + ", ".join(v.__name__ for v in value) + ")"
    return repr(value)


def _compare(ok, expected, actual, msg):
    return _report(ok, msg, ["expected: " + _show(expected), "     got: " + _show(actual)])


def assert_true(value, msg=""):
    """Passes when value is truthy."""
    return _check(lambda: _report(bool(value), msg), [value], msg)


def assert_false(value, msg=""):
    """Passes when value is falsy."""
    return _check(lambda: _report(not value, msg), [value], msg)


def assert_equal(actual, expected, msg=""):
    """Passes when actual == expected."""
    return _check(lambda: _compare(actual == expected, expected, actual, msg), [actual, expected], msg)


def assert_not_equal(actual, unexpected, msg=""):
    """Passes when actual != unexpected."""
    return _check(lambda: _report(actual != unexpected, msg, ["didn't want: " + _show(unexpected)]), [actual, unexpected], msg)


def assert_is(actual, expected, msg=""):
    """Passes when actual is expected: the very same object."""
    return _check(lambda: _compare(actual is expected, expected, actual, msg), [actual, expected], msg)


def assert_is_instance(value, cls, msg=""):
    """Passes when value is an instance of cls."""
    return _check(lambda: _compare(isinstance(value, cls), cls, type(value), msg), [value, cls], msg)


def assert_in(member, container, msg=""):
    """Passes when member in container."""
    return _check(lambda: _report(member in container, msg, [repr(member) + " is not in " + repr(container)]), [member, container], msg)


def assert_raises(exception, function, msg=""):
    """Passes when calling function raises exception (a class, or a tuple of them)."""

    def test():
        try:
            function()
        except exception:
            return _report(True, msg)
        except BaseException as e:
            return _compare(False, exception, type(e), msg)
        return _report(False, msg, ["expected: " + _show(exception), "     got: no exception"])

    return _check(test, [exception, function], msg)
