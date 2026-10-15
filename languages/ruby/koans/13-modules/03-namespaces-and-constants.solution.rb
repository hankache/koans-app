module Garden
  SEASONS = %w[spring summer].freeze

  class Rose
    def self.color = 'red'
  end
end
expect(Garden::Rose.color).to eq('red'), ':: reaches into a namespace'
expect(Garden::SEASONS.first).to eq('spring'), 'a constant in a module'
expect(Garden::SEASONS.frozen?).to eq(true), 'frozen, so it cannot be changed'
expect(Garden::Rose.name).to eq('Garden::Rose'), 'the full name'
expect(Garden.constants.sort).to eq([:Rose, :SEASONS]), 'constants lists them'
