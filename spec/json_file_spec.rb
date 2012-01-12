require 'yajl'

RSpec::Matchers.define :have_attribute do |field|
  match do |entry|
    entry.keys.include?(field)
  end
end

describe "index.json file" do

  before do
    @file = File.read('index.json')
    @file.sub!('var places = ', '')
  end

  it "is valid" do
    lambda {
      Yajl::Parser.new.parse(@file)
    }.should_not raise_error(Yajl::ParseError)
  end

  it "has all correct entries" do
    parsed = Yajl::Parser.new.parse(@file)
    parsed.each do |entry|
      entry.should have_attribute("address")
      entry.should have_attribute("city")
      entry.should have_attribute("coordinates")
      entry.should have_attribute("country")
      entry.should have_attribute("description")
      entry.should have_attribute("name")
      entry['description'].should have_attribute("internet")
      entry['description'].should have_attribute("power_outlets")
      entry['description'].should have_attribute("seating")
      entry['description'].should have_attribute("service")
      entry['description'].should have_attribute("provision")
    end
  end

end
