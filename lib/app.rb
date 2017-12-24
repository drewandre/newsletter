require 'pry'
require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/reloader'
require 'sinatra/flash'
# require_relative 'app/helpers/helpers.rb'
begin
  require './env' if File.exists?('env.rb')
rescue LoadError
  puts "Couldn't find env file"
end
configure do
  ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'])
  set :server, :puma
end

set :root, 'lib/app'

get '/' do
  render :html, :index
end
