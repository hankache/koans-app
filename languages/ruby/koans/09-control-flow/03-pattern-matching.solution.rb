def handle(event)
  case event
  in { type: 'click', x: Integer => x, y: Integer => y } then "click at #{x},#{y}"
  in { type: 'key', key: String => key } then "key #{key}"
  in [first, *] then "a list starting with #{first}"
  else 'unknown'
  end
end
expect(handle({ type: 'click', x: 3, y: 4 })).to eq('click at 3,4'), 'a hash pattern binds values'
expect(handle({ type: 'key', key: 'q', shift: true })).to eq('key q'), 'extra keys are fine'
expect(handle([9, 8])).to eq('a list starting with 9'), 'an array pattern'
config = { db: { user: 'admin', port: 5432 } }
config => { db: { port: } }
expect(port).to eq(5432), '=> takes data apart, or raises'
expect((5 in Integer | Float)).to eq(true), 'in asks whether a value matches'
