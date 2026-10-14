# title: Big and small
# intro: Python's integers have no size limit. Floats are binary approximations, so `0.1` is not quite one tenth: compare them with `pytest.approx`.
assert 2 ** 100 == ___, 'integers grow as large as needed'
assert (0.1 + 0.2 == 0.3) == ___, 'floats are approximations'
assert 0.1 + 0.2 == pytest.approx(___), 'pytest.approx allows for that'
assert 1_000_000 == ___, 'underscores group digits'
assert 0b1010 == ___, '0b starts a binary number'
assert 0xff == ___, '0x starts a hexadecimal one'
assert float('inf') > ___, 'infinity is bigger than any number'
