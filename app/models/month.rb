class Month < ApplicationRecord
  belongs_to :count
  has_many :movements, dependent: :destroy
end
