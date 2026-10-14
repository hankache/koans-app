# title: String methods
# intro: Strings come with methods. None of them changes the string: each returns a new one.
assert 'hello'.upper() == ___, 'upper case'
assert 'hello world'.title() == ___, 'a capital for each word'
assert '  pad  '.strip() == ___, 'strip removes the spaces around'
assert 'banana'.count('a') == ___, 'count a substring'
assert 'banana'.find('n') == ___, 'where it first appears'
assert 'banana'.find('x') == ___, 'find gives -1 when it is not there'
assert 'koan'.startswith('ko'), 'how a string begins'
assert 'a-b-c'.replace('-', '+') == ___, 'replace every match'
assert 'Hello'.removeprefix('He') == ___, 'removeprefix takes it off the front'
