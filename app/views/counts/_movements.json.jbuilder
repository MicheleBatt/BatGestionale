json.array! @movements.each do | movement |
  json.id movement.id
  json.amount movement.amount
  json.causal movement.causal
  json.currency_date movement.currency_date.in_time_zone("Europe/Rome").try(:strftime, '%d/%m/%Y')
  json.movement_type movement.movement_type
  json.year movement.year
  json.month movement.month

  if movement.expense_item.present?
    json.expense_item_id movement.expense_item_id
    json.expense_item do
      json.call(movement.expense_item, :id, :description, :color)
    end
  end
end