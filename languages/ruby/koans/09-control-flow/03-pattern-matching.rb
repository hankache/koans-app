# title: Pattern matching
# intro: `case`/`in` matches the shape of data, arrays and hashes alike, and binds the parts it finds to variables.
def handle(event)
  case event
  in { type: 'click', x: Integer => x, y: Integer => y } then "click at #{x},#{y}"
  in { type: 'key', key: String => key } then "key #{key}"
  in [first, *] then "a list starting with #{first}"
  else 'unknown'
  end
end
expect(handle({ type: 'click', x: 3, y: 4 })).to eq(___), 'a hash pattern binds values'
expect(handle({ type: 'key', key: 'q', shift: true })).to eq(___), 'extra keys are fine'
expect(handle([9, 8])).to eq(___), 'an array pattern'
config = { db: { user: 'admin', port: 5432 } }
config => { db: { port: } }
expect(port).to eq(___), '=> takes data apart, or raises'
expect((5 in Integer | Float)).to eq(___), 'in asks whether a value matches'
