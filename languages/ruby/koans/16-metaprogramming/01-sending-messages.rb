# title: Sending messages
# intro: Calling a method is sending a message. `public_send` sends one by name, `respond_to?` asks whether it would be understood.
expect(5.public_send(:+, 3)).to eq(___), 'send a message by name'
expect(%w[upcase reverse].map { |m| 'Abc'.public_send(m) }).to eq(___), 'messages chosen at run time'
expect('text').to respond_to(___), 'respond_to'
expect([1, 2, 3].map { |n| n.public_send(:*, 2) }).to eq(___), 'operators are messages too'
expect(5.method(:+).owner).to eq(___), 'where a method is defined'
