class DropMonths < ActiveRecord::Migration[7.0]
  def change
    remove_column :movements, :month_id
    remove_column :counts, :amount
    drop_table :months
    add_column :movements, :year, :integer, null: false
    add_column :movements, :month, :integer, null: false
    add_column :movements, :year_month, :integer, null: false
  end
end
