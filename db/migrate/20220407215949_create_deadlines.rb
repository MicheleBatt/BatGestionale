class CreateDeadlines < ActiveRecord::Migration[7.0]
  def change
    create_table :deadlines do |t|
      t.datetime :expired_at
      t.string :description, null: false, default: ''

      t.timestamps
    end
  end
end
