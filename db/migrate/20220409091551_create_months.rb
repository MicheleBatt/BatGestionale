class CreateMonths < ActiveRecord::Migration[7.0]
  def change
    create_table :months do |t|
      t.references :count, null: false, foreign_key: true
      t.integer :year, null: false
      t.integer :month, null: false
      t.float :initial_amount, null: false
      t.float :final_amount, null: false

      t.timestamps
    end
  end
end
