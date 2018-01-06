# require 'sinatra/base'
#
# helpers do
#
#   def post_new_user_to_mailchimp(user)
#     email = user.email
#     name = user.full_name
#     zipcode = user.zipcode
#     category = user.category
#     age = user.age
#     comment = user.comment.comment
#
#     response = RestClient::Request.execute(
#       method: :post,
#       user: 'anything',
#       password: '526e48d4d5e6341fa9e2f6f174149243',
#       url: "https://us17.api.mailchimp.com/3.0/lists/a1739a408d/members",
#       payload: { 'email_address':email, "status":"subscribed", merge_fields:{"NAME":name, "ZIPCODE":zipcode, "CATEGORY":category, "COMMENT":comment, "AGE":age} }.to_json,
#       headers: { :accept => :json, content_type: :json }
#     )
#   end
#
#   def get_age_from_spotify_birthday(birthdate)
#     now = Time.now.utc.to_date
#     birthdate = birthdate.split("-")
#     year = birthdate[0].to_i
#     month = birthdate[1].to_i
#     day = birthdate[2].to_i
#     return now.year - year - ((now.month > month || (now.month == month && now.day >= day)) ? 0 : 1)
#   end
# end
