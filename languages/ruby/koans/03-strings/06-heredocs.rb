# title: Heredocs
# intro: A heredoc writes a multi-line string. `<<~` removes the indentation the lines share, so it can be indented with the code.
poem = <<~TEXT
  The gate
    has no door
TEXT
expect(poem).to eq(___), '<<~ removes the shared indentation'
expect(poem.lines.size).to eq(___), 'lines splits after each newline'
expect(poem.lines.map(&:strip)).to eq(___), 'and strip trims each'
