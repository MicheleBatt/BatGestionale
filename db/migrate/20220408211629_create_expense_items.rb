class CreateExpenseItems < ActiveRecord::Migration[7.0]
  def change
    create_table :expense_items do |t|
      t.string :description, null: false
      t.string :color, null: false

      t.index "description", unique: true
      t.index "color", unique: true

      t.timestamps
    end
  end
end
