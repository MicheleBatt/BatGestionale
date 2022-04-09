class Count < ApplicationRecord
  has_many :months, dependent: :destroy
end
