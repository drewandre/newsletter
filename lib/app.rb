require 'json'
require 'pry'
require 'rspotify'
require 'sinatra'
require 'sinatra/activerecord'
require "sinatra/namespace"
require 'sinatra/reloader'
require 'sinatra/flash'
require_relative './app/helpers/helpers.rb'

begin
  require './env' if File.exists?('env.rb')
rescue LoadError
  puts "Couldn't find env file"
end

configure do
  ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'])
  RSpotify.authenticate(ENV['SPOTIFY_ID'], ENV['SPOTIFY_SECRET'])
  set :server, :puma
end

set :root, 'lib/app'

get '/' do
  @SPOTIFY_ID = ENV['SPOTIFY_ID']
  @SPOTIFY_SECRET = ENV['SPOTIFY_SECRET']
  render :html, :index
end

namespace '/spotify' do
  before do
    content_type 'application/json'
  end

  get '/artists/:artist' do
    content_type :json
    artists = RSpotify::Artist.search(params['artist'], limit: 4)
    return artists.to_json
  end
end

get '/*' do
  redirect '/'
end
