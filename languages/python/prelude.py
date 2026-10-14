# Run before every koan. The build wraps all of it in one exec("…") on ONE line, so the koan's line
# numbers shift by exactly one, and the koan runs at the top level of the same module.
#
# Koans are written the pytest way: `assert x == y, "message"` and `with pytest.raises(E):`. The
# runner (public/runtime/python/worker.js) rewrites each assert into a call to one of the _koan_
# helpers below, the way pytest rewrites asserts, so a failing one prints its result as TAP, with
# both sides of a comparison, and the koan carries on. An assert holding a blank becomes
# _koan_blank, which fails without running it.

import operator as _operator
import re as _re
import sys as _sys


class _Blank:
    """___: the blank to fill in."""

    def __repr__(self):
        return "___"


___ = _Blank()

_koan_tests = 0


def _koan_show(value):
    # Classes by name (ValueError, not <class 'ValueError'>), everything else as Python writes it.
    if isinstance(value, type):
        return value.__name__
    if isinstance(value, tuple) and value and all(isinstance(v, type) for v in value):
        return "(" + ", ".join(v.__name__ for v in value) + ")"
    return repr(value)


def _koan_report(ok, msg, line, diag=()):
    global _koan_tests
    _koan_tests += 1
    print(("ok " if ok else "not ok ") + str(_koan_tests) + (" - " + str(msg) if msg else ""), flush=True)
    if not ok:
        for text in diag:
            print("# " + text, file=_sys.stderr, flush=True)
        print("# at web line %d" % line, file=_sys.stderr, flush=True)
    return ok


def _koan_blank(msg, line):
    return _koan_report(False, msg, line)


_KOAN_OPS = {
    "Eq": (_operator.eq, "=="),
    "NotEq": (_operator.ne, "!="),
    "Lt": (_operator.lt, "<"),
    "LtE": (_operator.le, "<="),
    "Gt": (_operator.gt, ">"),
    "GtE": (_operator.ge, ">="),
    "Is": (_operator.is_, "is"),
    "IsNot": (_operator.is_not, "is not"),
    "In": (lambda a, b: a in b, "in"),
    "NotIn": (lambda a, b: a not in b, "not in"),
}


def _koan_compare(left, op, right, msg, line):
    if left is ___ or right is ___:
        return _koan_report(False, msg, line)
    test, symbol = _KOAN_OPS[op]
    ok = bool(test(left, right))
    if op in ("Eq", "Is"):
        diag = ["expected: " + _koan_show(right), "     got: " + _koan_show(left)]
    else:
        diag = [_koan_show(left) + " " + symbol + " " + _koan_show(right) + " is false"]
    return _koan_report(ok, msg, line, diag)


def _koan_truth(value, msg, line):
    if value is ___:
        return _koan_report(False, msg, line)
    return _koan_report(bool(value), msg, line, ["the assertion is false"])


class _Raises:
    """pytest.raises: the with block must raise `expected` (and its message match `match`)."""

    def __init__(self, expected, *, match=None, _line=0, _desc=None):
        self.expected, self.match, self.line, self.desc = expected, match, _line, _desc
        self.value = self.type = None

    def __enter__(self):
        return self

    def __exit__(self, kind, error, tb):
        wanted = "expected: " + _koan_show(self.expected)
        if kind is None:
            _koan_report(False, self.desc, self.line, [wanted, "     got: no exception"])
            return False
        if not issubclass(kind, self.expected):
            _koan_report(False, self.desc, self.line, [wanted, "     got: " + kind.__name__])
            return True
        if self.match is not None and not _re.search(self.match, str(error)):
            _koan_report(False, self.desc, self.line, ["expected a message matching " + repr(self.match), "     got: " + repr(str(error))])
            return True
        self.value, self.type = error, kind
        _koan_report(True, self.desc, self.line)
        return True


class _Approx:
    """pytest.approx: equal to within a relative tolerance (one in a million, by default)."""

    def __init__(self, expected, rel=1e-6, abs=1e-12):
        self.expected, self.rel, self.abs = expected, rel, abs

    def __eq__(self, other):
        return abs(other - self.expected) <= max(self.rel * abs(self.expected), self.abs)

    def __repr__(self):
        return "approx(" + repr(self.expected) + ")"


class pytest:
    raises = _Raises
    approx = _Approx
