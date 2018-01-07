require 'httparty'
require 'json'
require 'pry'
require 'rspotify'
require 'omniauth'
require 'omniauth-spotify'
require 'sinatra/base'
require 'sinatra/activerecord'
require "sinatra/namespace"
require 'sinatra/contrib'
require 'sinatra/reloader'
require 'sinatra/flash'
require './lib/app/models/user.rb'
binding.pry
require './env.rb'

# begin
  # require './env' if File.exists?('env.rb')
# rescue LoadError
#   puts "Couldn't find env file"
# end

module RegistrationHelpers

  # def post_new_user_to_mailchimp(user)
  #   email = user.email
  #   name = user.full_name
  #   zipcode = user.zipcode
  #   category = user.category
  #   age = user.age
  #   comment = user.comment.comment
  #
  #   response = RestClient::Request.execute(
  #     method: :post,
  #     user: 'anything',
  #     password: '526e48d4d5e6341fa9e2f6f174149243',
  #     url: "https://us17.api.mailchimp.com/3.0/lists/a1739a408d/members",
  #     payload: { 'email_address':email, "status":"subscribed", merge_fields:{"NAME":name, "ZIPCODE":zipcode, "CATEGORY":category, "COMMENT":comment, "AGE":age} }.to_json,
  #     headers: { :accept => :json, content_type: :json }
  #   )
  # end

  def get_age_from_spotify_birthday(birthdate)
    now = Time.now.utc.to_date
    birthdate = birthdate.split("-")
    year = birthdate[0].to_i
    month = birthdate[1].to_i
    day = birthdate[2].to_i
    return now.year - year - ((now.month > month || (now.month == month && now.day >= day)) ? 0 : 1)
  end

end

class Newsletter < Sinatra::Base
  register Sinatra::Contrib
  helpers RegistrationHelpers

  configure do
    ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'])
    RSpotify.authenticate(ENV['SPOTIFY_ID'], ENV['SPOTIFY_SECRET'])
    set :sessions, true
    # set :server, :puma
  end
  use OmniAuth::Builder do
    provider :spotify, ENV['SPOTIFY_ID'], ENV['SPOTIFY_SECRET'], scope: 'user-library-read user-read-birthdate user-read-email user-top-read user-read-recently-played'
  end

  set :root, 'lib/app'

  get '/' do
    render :html, :index
  end

  get '/auth/spotify/callback' do
    spotify_user_top_genres = []
    spotify_user_top_artist_ids = []
    # spotify_user_top_artist_names = []
    JSON.pretty_generate(request.env['omniauth.auth'])
    spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
    spotify_user_age = get_age_from_spotify_birthday(spotify_user.birthdate)
    spotify_email = spotify_user.email
    spotify_name = spotify_user.display_name
    spotify_user_top_artists = spotify_user.top_artists(limit: 20, offset: 0, time_range: 'medium_term')
    spotify_user_top_artists.each do |artist|
      spotify_user_top_genres.concat(artist.genres)
      spotify_user_top_artist_ids.push(artist.id)
      # spotify_user_top_artist_names.push(artist.name)
    end
    spotify_user_top_genres = spotify_user_top_genres.uniq
    user = User.new(
      name: spotify_name,
      email: spotify_email,
      age: spotify_user_age,
      top_artist_ids: spotify_user_top_artist_ids,
      top_genres: spotify_user_top_genres
    )
    if user.save
      # save into session
      redirect '/subscribe'
    else
      puts "error saving user"
    end
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
end
