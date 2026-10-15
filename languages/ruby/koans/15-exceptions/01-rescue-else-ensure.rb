# title: rescue, else and ensure
# intro: `rescue` handles an exception, `else` runs when there was none, and `ensure` always runs. A `begin` block returns a value, like everything else.
def attempt(x)
  log = []
  result = begin
    10 / x
  rescue ZeroDivisionError => e
    log << e.class.name
    :infinite
  else
    log << 'fine'
    :finite
  ensure
    log << 'done'
  end
  [result, log]
end
expect(attempt(0)).to eq(___), 'rescue, then ensure'
expect(attempt(5)).to eq(___), 'else, then ensure'
safe = Integer('x') rescue -1
expect(safe).to eq(___), 'rescue as a modifier'
