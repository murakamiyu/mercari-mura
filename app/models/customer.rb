class Customer < ApplicationRecord
  belongs_to :user

  validates :token, presence: true
end
