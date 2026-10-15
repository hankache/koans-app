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
expect(attempt(0)).to eq([:infinite, ['ZeroDivisionError', 'done']]), 'rescue, then ensure'
expect(attempt(5)).to eq([:finite, ['fine', 'done']]), 'else, then ensure'
safe = Integer('x') rescue -1
expect(safe).to eq(-1), 'rescue as a modifier'
