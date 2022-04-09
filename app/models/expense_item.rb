class ExpenseItem < ApplicationRecord
  validates :description, :color, presence: true, uniqueness: true
end
