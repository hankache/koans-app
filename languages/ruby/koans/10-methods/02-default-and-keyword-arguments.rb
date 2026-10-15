# title: Default and keyword arguments
# intro: Arguments can have defaults. Keyword arguments are named at the call; without a default, they're required.
def brew(drink = 'tea', sugar: 0, milk: false)
  "#{drink}, #{sugar} sugar#{', milk' if milk}"
end
expect(brew).to eq(___), 'all defaults'
expect(brew('coffee', milk: true)).to eq(___), 'keywords by name'
def book(title:, year:)
  "#{title} (#{year})"
end
expect(book(year: 1843, title: 'Notes')).to eq(___), 'in any order'
expect { book(title: 'Notes') }.to raise_error(ArgumentError, ___), 'a required keyword'
