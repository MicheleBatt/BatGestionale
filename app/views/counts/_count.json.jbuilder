json.extract! count, :id, :name, :description, :initial_amount, :created_at, :updated_at
json.url count_url(count, format: :json)

json.initial_month_amount @initial_month_amount
json.out_month @out_month
json.in_month @in_month
json.in_out_month @in_out_month
json.amounts_by_expensive_items @movements_amounts_by_expense_item
json.current_year @current_year
json.current_month @current_month
json.enable_previous_month enable_previous_month(@count, @current_year_month)
json.enable_next_month enable_next_month(@count, @current_year_month)

json.movements do
  json.partial! 'counts/movements', as: :movements
end