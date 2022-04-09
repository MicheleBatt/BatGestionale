json.array! @expense_items.each do | expense_item |
  json.id expense_item.id
  json.description expense_item.description
  json.color expense_item.color
end