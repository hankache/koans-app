# title: catch and throw
# intro: `throw` jumps out to the `catch` with the same tag, however deep it is, carrying a value. It's for leaving nested loops, not for errors.
found = catch(:done) do
  [[1, 2], [3, 4]].each do |row|
    row.each { |n| throw :done, n if n > 2 }
  end
  nil
end
expect(found).to eq(___), 'throw leaves both loops, with a value'
finished = catch(:skip) { 'finished' }
expect(finished).to eq(___), 'without a throw, catch gives the block value'
empty = catch(:x) { throw :x }
expect(empty).to eq(___), 'a throw without a value gives nil'
expect { throw :nobody }.to raise_error(___), 'a throw nobody catches is an error'
