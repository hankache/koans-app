# title: Bytes and encodings
# intro: Text is `str`; raw data is `bytes`. `encode()` turns text into bytes, UTF-8 by default, and `decode()` turns bytes back into text.
assert 'é'.encode() == ___, 'é takes two bytes in UTF-8'
assert len('é'.encode()) == ___, 'so its length in bytes is 2'
assert len('é') == ___, 'but it is one character'
assert b'abc'[0] == ___, 'indexing bytes gives a number'
assert b'caf\xc3\xa9'.decode() == ___, 'decode turns bytes into text'
assert type(b'') is ___, 'the b prefix makes bytes'
