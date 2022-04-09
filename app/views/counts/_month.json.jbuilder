json.id @current_month.id
json.year @current_month.year
json.month @current_month.month
json.initial_amount @current_month.initial_amount
json.final_amount @current_month.final_amount

json.movements do
  json.array! @current_month.movements.order(currency_date: :asc).each do | movement |
    json.id movement.id
    json.amount movement.amount
    json.causal movement.causal
    json.currency_date movement.currency_date.in_time_zone("Europe/Rome").try(:strftime, '%d/%m/%Y')
    json.movement_type movement.movement_type
    json.expense_item do
      json.call(movement.expense_item, :id, :description, :color)
    end
  end
end