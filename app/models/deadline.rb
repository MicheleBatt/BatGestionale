class Deadline < ApplicationRecord
  validates :expired_at, :description, presence: true
end
