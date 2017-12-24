class User < ActiveRecord::Base
  EMAIL_REGEXP = /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/

  has_one :comment

  before_save :downcase_email, :capitalize_full_name

  validates_format_of :email, with: EMAIL_REGEXP, :message => "is not a valid email!"
  validates_presence_of :email, :full_name, :zipcode, :category, :age, :message => "can't be blank"
  validates :age, numericality: { only_integer: true }
  validates :zipcode, length: { is: 5 }

  def downcase_email
    self.email.downcase!
  end

  def capitalize_full_name
    self.full_name = self.full_name.split.map(&:capitalize).join(' ')
  end
end
