class Movement < ApplicationRecord
  belongs_to :count
  belongs_to :month
  belongs_to :expense_item

  validates :amount, :movement_type, :causal, :currency_date, presence: true
  validate :is_valid_count_id_and_month_id

  enum movement_type: %w[in out].index_by(&:itself), _prefix: :movement_type

  def is_valid_count_id_and_month_id
    if self.count_id != self.month.count_id
      errors.add(:count_id, 'Count id and month.count_id do not match!')
    end
  end
end
