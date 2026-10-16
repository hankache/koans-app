m = /(?<year>\d{4})-(?<month>\d\d)/.match('Due 2026-10, paid')
expect(m[:year]).to eq('2026'), 'a named group, by name'
expect(m.pre_match).to eq('Due '), 'what came before it'
expect(m.named_captures).to eq({ 'year' => '2026', 'month' => '10' }), 'every group, in a hash'
expect('2026-10'.match?(/\d{4}/)).to eq(true), 'match? only says yes or no'
expect('Hello'[/l+/]).to eq('ll'), 'a regexp as an index gives what matched'
/(?<user>\w+)@/ =~ 'ada@example.com'
expect(user).to eq('ada'), '=~ with a literal regexp on the left makes local variables'
