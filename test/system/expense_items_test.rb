require "application_system_test_case"

class ExpenseItemsTest < ApplicationSystemTestCase
  setup do
    @expense_item = expense_items(:one)
  end

  test "visiting the index" do
    visit expense_items_url
    assert_selector "h1", text: "Expense items"
  end

  test "should create expense item" do
    visit expense_items_url
    click_on "New expense item"

    fill_in "Color", with: @expense_item.color
    fill_in "Description", with: @expense_item.description
    click_on "Create Expense item"

    assert_text "Expense item was successfully created"
    click_on "Back"
  end

  test "should update Expense item" do
    visit expense_item_url(@expense_item)
    click_on "Edit this expense item", match: :first

    fill_in "Color", with: @expense_item.color
    fill_in "Description", with: @expense_item.description
    click_on "Update Expense item"

    assert_text "Expense item was successfully updated"
    click_on "Back"
  end

  test "should destroy Expense item" do
    visit expense_item_url(@expense_item)
    click_on "Destroy this expense item", match: :first

    assert_text "Expense item was successfully destroyed"
  end
end
