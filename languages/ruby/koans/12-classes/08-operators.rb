# title: Operators
# intro: Most operators are methods: `a + b` calls `a.+(b)`. Define `+`, `*`, `[]` or `-@` (unary minus), and your objects work with the operators. `+=` comes free with `+`.
Vec = Struct.new(:x, :y) do
  def +(other)
    Vec.new(x + other.x, y + other.y)
  end

  def *(other)
    Vec.new(x * other, y * other)
  end

  def -@
    Vec.new(-x, -y)
  end

  def to_s
    "(#{x}, #{y})"
  end
end
v = Vec.new(1, 2)
expect((v + Vec.new(3, 4)).to_a).to eq(___), '+ is a method'
expect((v * 3).to_s).to eq(___), 'so is *'
expect((-v).to_a).to eq(___), 'unary minus is -@'
expect(v[1]).to eq(___), 'a Struct already has []'
w = v
w += Vec.new(1, 1)
expect(w.to_a).to eq(___), '+= uses +'
expect(v.to_a).to eq(___), 'and makes a new object'
