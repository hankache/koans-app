# title: Expectations
# intro: Koans are tested the way most Ruby is tested: with RSpec. `expect(actual).to eq(expected)` wants the two equal, and the text after the comma describes the test. Replace each `___` so every expectation passes.
expect(1 + 1).to eq(___), 'eq compares values'
expect('Ru' + 'by').to eq(___), 'strings join with +'
expect(10 - 4).not_to eq(___), 'not_to turns an expectation around'
expect(3 > 2).to be(___), 'a comparison gives true or false'
expect([1, 2, 3]).to include(___), 'include looks inside a collection'
