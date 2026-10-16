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
expect((v + Vec.new(3, 4)).to_a).to eq([4, 6]), '+ is a method'
expect((v * 3).to_s).to eq('(3, 6)'), 'so is *'
expect((-v).to_a).to eq([-1, -2]), 'unary minus is -@'
expect(v[1]).to eq(2), 'a Struct already has []'
w = v
w += Vec.new(1, 1)
expect(w.to_a).to eq([2, 3]), '+= uses +'
expect(v.to_a).to eq([1, 2]), 'and makes a new object'
