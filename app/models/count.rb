class Count < ApplicationRecord
  has_many :movements, dependent: :destroy
end
