# title: Symbols
# intro: A symbol, `:name`, is a name that's always the same object. Symbols make good hash keys and method names.
expect(:koan.class).to eq(___), 'a symbol'
expect(:koan.object_id == :koan.object_id).to eq(___), 'every :koan is the same object'
expect(:koan.to_s).to eq(___), 'to and from strings'
expect('koan'.to_sym).to eq(___), 'to_sym'
expect(:"two words".to_s).to eq(___), 'quotes allow any name'
expect(%i[a b c]).to eq(___), '%i makes an array of symbols'
expect(5.respond_to?(:even?)).to eq(___), 'methods are named by symbols'
