# title: Class methods and state
# intro: `def self.name` defines a method on the class itself. State shared by the class can live in an instance variable of the class.
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
expect(Ticket.issued).to eq(___), 'state on the class'
expect(Ticket.respond_to?(:issue)).to eq(___), 'a class method'
expect(Ticket.new.respond_to?(:issue)).to eq(___), 'which instances do not have'
expect(Ticket.singleton_methods.sort).to eq(___), 'they live on the class alone'
