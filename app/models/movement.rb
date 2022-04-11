class Movement < ApplicationRecord
  belongs_to :count, :class_name => 'Count'
  belongs_to :expense_item, optional: true

  validates :amount, :movement_type, :causal, :currency_date, presence: true

  before_save { self.year = currency_date.year if currency_date }
  before_save { self.month = currency_date.month if currency_date }
  before_save { self.year_month = (currency_date.year.to_s + currency_date.month.to_s.rjust(2, '0')).to_i if currency_date }

  enum movement_type: %w[in out].index_by(&:itself), _prefix: :movement_type
end
