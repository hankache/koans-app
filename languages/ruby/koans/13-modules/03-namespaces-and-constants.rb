# title: Namespaces and constants
# intro: Modules also group names: `Outer::Inner` reaches inside. Constants start with a capital letter, and Ruby warns, but allows, reassigning them.
module Garden
  SEASONS = %w[spring summer].freeze

  class Rose
    def self.color = 'red'
  end
end
expect(Garden::Rose.color).to eq(___), ':: reaches into a namespace'
expect(Garden::SEASONS.first).to eq(___), 'a constant in a module'
expect(Garden::SEASONS.frozen?).to eq(___), 'frozen, so it cannot be changed'
expect(Garden::Rose.name).to eq(___), 'the full name'
expect(Garden.constants.sort).to eq(___), 'constants lists them'
