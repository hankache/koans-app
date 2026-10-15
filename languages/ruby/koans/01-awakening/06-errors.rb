# title: Errors
# intro: `expect { … }.to raise_error(Class)` runs the block and wants it to raise that error. A string or pattern after the class checks the message.
expect { 1 / 0 }.to raise_error(___), 'dividing an integer by zero'
expect { Integer('ten') }.to raise_error(___), 'a string that is not a number'
expect { nil + 1 }.to raise_error(___), 'nil has no +'
expect { 1 + 'one' }.to raise_error(___), 'numbers and strings do not add'
expect { raise 'stop' }.to raise_error(___), 'raise with a message raises a RuntimeError'
expect { raise ArgumentError, 'too big' }.to raise_error(ArgumentError, ___), 'and the message'
expect { [1, 2].fetch(5) }.to raise_error(IndexError, ___), 'a pattern matches part of a message'
