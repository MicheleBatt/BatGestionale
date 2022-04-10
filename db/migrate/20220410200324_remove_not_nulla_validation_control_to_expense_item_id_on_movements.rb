class RemoveNotNullaValidationControlToExpenseItemIdOnMovements < ActiveRecord::Migration[7.0]
  def change
    change_column :movements, :expense_item_id, :bigint, null: true
  end
end
