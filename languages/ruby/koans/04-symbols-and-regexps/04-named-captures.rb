# title: Named captures
# intro: `(?<name>…)` names a group, so a match can be read by name. `match?` only says yes or no, and a string indexed with a regexp gives what matched.
m = /(?<year>\d{4})-(?<month>\d\d)/.match('Due 2026-10, paid')
expect(m[:year]).to eq(___), 'a named group, by name'
expect(m.pre_match).to eq(___), 'what came before it'
expect(m.named_captures).to eq(___), 'every group, in a hash'
expect('2026-10'.match?(/\d{4}/)).to eq(___), 'match? only says yes or no'
expect('Hello'[/l+/]).to eq(___), 'a regexp as an index gives what matched'
/(?<user>\w+)@/ =~ 'ada@example.com'
expect(user).to eq(___), '=~ with a literal regexp on the left makes local variables'
