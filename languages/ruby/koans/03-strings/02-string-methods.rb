# title: String methods
# intro: Strings have a method for nearly everything. Methods that return a changed copy leave the original alone.
expect('hello'.upcase).to eq(___), 'upper case'
expect('hello world'.capitalize).to eq(___), 'only the first letter'
expect('  trim me  '.strip).to eq(___), 'strip removes surrounding spaces'
expect('ruby'.reverse).to eq(___), 'reverse'
expect('banana'.count('a')).to eq(___), 'count characters'
expect('banana'.index('n')).to eq(___), 'where it first appears'
expect('hello'.sub('l', 'L')).to eq(___), 'sub replaces the first match'
expect('hello'.gsub('l', 'L')).to eq(___), 'gsub replaces them all'
expect('hello').to start_with(___), 'start_with'
