# title: Quotes and interpolation
# intro: Double quotes interpolate `#{…}` and understand escapes like `\n`; single quotes take nearly everything literally.
lang = 'Ruby'
expect("I like #{lang}").to eq(___), 'double quotes interpolate'
expect('I like #{lang}').to eq(___), 'single quotes do not'
expect("#{1 + 2}").to eq(___), 'any expression goes in #{}'
expect("a\tb".length).to eq(___), '\\t is one tab character'
expect('a\tb'.length).to eq(___), 'single quotes keep the backslash'
expect(%q(it's "quoted")).to eq(___), '%q() quotes without escaping'
