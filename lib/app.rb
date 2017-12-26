require 'httparty'
require 'json'
require 'pry'
require 'rspotify'
require 'omniauth'
require 'omniauth-spotify'
require 'sinatra'
require 'sinatra/activerecord'
require "sinatra/namespace"
require 'sinatra/contrib'
require 'sinatra/reloader'
require 'sinatra/flash'
# require_relative 'lib/app/helpers/helpers.rb'

begin
  require './env' if File.exists?('env.rb')
rescue LoadError
  puts "Couldn't find env file"
end

# class Newsletter < Sinatra::Base
  # register Sinatra::Contrib

  configure do
    ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'])
    RSpotify.authenticate(ENV['SPOTIFY_ID'], ENV['SPOTIFY_SECRET'])
    set :sessions, true
    set :server, :puma
  end
  use OmniAuth::Builder do
    provider :spotify, ENV['SPOTIFY_ID'], ENV['SPOTIFY_SECRET'], scope: 'user-library-read user-read-birthdate user-read-email user-top-read user-read-recently-played'
  end

  set :root, 'lib/app'

  get '/' do
    render :html, :index
  end

  get '/auth/spotify/callback' do
    JSON.pretty_generate(request.env['omniauth.auth'])
    spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
    @spotify_user_top = spotify_user.top_artists(limit: 10, offset: 0, time_range: 'medium_term')
    redirect '/subscribe'
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
    render :html, :index
  end

  # run!
# end
