helpers do

  def post_new_user_to_mailchimp(user)
    email = user.email
    name = user.full_name
    zipcode = user.zipcode
    category = user.category
    age = user.age
    comment = user.comment.comment

    response = RestClient::Request.execute(
      method: :post,
      user: 'anything',
      password: '526e48d4d5e6341fa9e2f6f174149243',
      url: "https://us17.api.mailchimp.com/3.0/lists/a1739a408d/members",
      payload: { 'email_address':email, "status":"subscribed", merge_fields:{"NAME":name, "ZIPCODE":zipcode, "CATEGORY":category, "COMMENT":comment, "AGE":age} }.to_json,
      headers: { :accept => :json, content_type: :json }
    )
  end
end
