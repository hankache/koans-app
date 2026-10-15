# title: Combining arrays
# intro: Arrays can be added, subtracted, intersected and joined. `*` with a number repeats an array; with a string, it joins.
expect([1, 2] + [2, 3]).to eq(___), '+ joins'
expect([1, 2, 2, 3] - [2]).to eq(___), '- removes every match'
expect([1, 2, 3] & [2, 3, 4]).to eq(___), '& is in both'
expect([1, 2] | [2, 3]).to eq(___), '| is in either, once'
expect([0] * 3).to eq(___), '* repeats'
expect([1, 2, 3] * '-').to eq(___), '* with a string joins'
expect([[1, 2], [3]].flatten).to eq(___), 'flatten'
expect([3, 1, 3, 2, 1].uniq).to eq(___), 'uniq keeps the first of each'
