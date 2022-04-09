class CreateMovements < ActiveRecord::Migration[7.0]
  def change
    create_table :movements do |t|
      t.references :count, null: false, foreign_key: true
      t.references :month, null: false, foreign_key: true
      t.references :expense_item, null: false, foreign_key: true
      t.float :amount, null: false
      t.text :causal, null: false
      t.string :movement_type, null: false
      t.datetime :currency_date, null: false

      t.timestamps
    end
  end
end
