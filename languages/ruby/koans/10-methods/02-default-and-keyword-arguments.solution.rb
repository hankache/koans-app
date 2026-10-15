def brew(drink = 'tea', sugar: 0, milk: false)
  "#{drink}, #{sugar} sugar#{', milk' if milk}"
end
expect(brew).to eq('tea, 0 sugar'), 'all defaults'
expect(brew('coffee', milk: true)).to eq('coffee, 0 sugar, milk'), 'keywords by name'
def book(title:, year:)
  "#{title} (#{year})"
end
expect(book(year: 1843, title: 'Notes')).to eq('Notes (1843)'), 'in any order'
expect { book(title: 'Notes') }.to raise_error(ArgumentError, /missing keyword/), 'a required keyword'
