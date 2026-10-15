# title: scan and gsub
# intro: `scan` returns every match, `gsub` replaces each match, with a string, a hash, or a block's result.
expect('a1b22c333'.scan(/\d+/)).to eq(___), 'scan finds them all'
expect('k=v; x=y'.scan(/(\w)=(\w)/)).to eq(___), 'with groups, arrays of groups'
expect('hello world'.gsub(/o/, '0')).to eq(___), 'gsub with a string'
expect('cat hat'.gsub(/[ch]/, 'c' => 'b', 'h' => 'm')).to eq(___), 'with a hash'
expect('3 apples, 5 pears'.gsub(/\d+/) { |n| (n.to_i * 2).to_s }).to eq(___), 'with a block'
expect('John Smith'.sub(/(\w+) (\w+)/, '\\2, \\1')).to eq(___), 'groups in the replacement'
