class CreateCounts < ActiveRecord::Migration[7.0]
  def change
    create_table :counts do |t|
      t.string :name, null: false, default: ''
      t.text :description
      t.float :amount, null: false, default: 0.0
      t.float :initial_amount, null: false, default: 0.0

      t.timestamps
    end
  end
end
