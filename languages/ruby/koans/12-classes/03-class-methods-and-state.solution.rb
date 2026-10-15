class Ticket
  @issued = 0

  class << self
    attr_reader :issued
  end

  def self.issue
    @issued += 1
    new
  end
end
Ticket.issue
Ticket.issue
expect(Ticket.issued).to eq(2), 'state on the class'
expect(Ticket.respond_to?(:issue)).to eq(true), 'a class method'
expect(Ticket.new.respond_to?(:issue)).to eq(false), 'which instances do not have'
expect(Ticket.singleton_methods.sort).to eq([:issue, :issued]), 'they live on the class alone'
