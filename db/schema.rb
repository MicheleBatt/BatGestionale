# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_04_10_200324) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "counts", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.text "description"
    t.float "initial_amount", default: 0.0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "iban"
  end

  create_table "deadlines", force: :cascade do |t|
    t.datetime "expired_at"
    t.string "description", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "expense_items", force: :cascade do |t|
    t.string "description", null: false
    t.string "color", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["color"], name: "index_expense_items_on_color", unique: true
    t.index ["description"], name: "index_expense_items_on_description", unique: true
  end

  create_table "movements", force: :cascade do |t|
    t.bigint "count_id", null: false
    t.bigint "expense_item_id"
    t.float "amount", null: false
    t.text "causal", null: false
    t.string "movement_type", null: false
    t.datetime "currency_date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "year", null: false
    t.integer "month", null: false
    t.integer "year_month", null: false
    t.index ["count_id"], name: "index_movements_on_count_id"
    t.index ["expense_item_id"], name: "index_movements_on_expense_item_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username", default: "", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "movements", "counts"
  add_foreign_key "movements", "expense_items"
end
