assert.ok(true, 'assert.ok passes when given something true');
assert.equal(1 + 1, 2, 'assert.equal compares two values');
assert.equal('Java' + 'Script', 'JavaScript', 'strings join with +');
assert.notEqual('cat', 'dog', 'assert.notEqual wants them to differ');
assert.deepEqual([1, 2], [1, 2], 'assert.deepEqual compares contents');
assert.equal(true && false, false, '&& wants both sides true');
