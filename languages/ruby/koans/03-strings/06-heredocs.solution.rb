poem = <<~TEXT
  The gate
    has no door
TEXT
expect(poem).to eq("The gate\n  has no door\n"), '<<~ removes the shared indentation'
expect(poem.lines.size).to eq(2), 'lines splits after each newline'
expect(poem.lines.map(&:strip)).to eq(['The gate', 'has no door']), 'and strip trims each'
