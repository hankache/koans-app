found = catch(:done) do
  [[1, 2], [3, 4]].each do |row|
    row.each { |n| throw :done, n if n > 2 }
  end
  nil
end
expect(found).to eq(3), 'throw leaves both loops, with a value'
finished = catch(:skip) { 'finished' }
expect(finished).to eq('finished'), 'without a throw, catch gives the block value'
empty = catch(:x) { throw :x }
expect(empty).to eq(nil), 'a throw without a value gives nil'
expect { throw :nobody }.to raise_error(UncaughtThrowError), 'a throw nobody catches is an error'
