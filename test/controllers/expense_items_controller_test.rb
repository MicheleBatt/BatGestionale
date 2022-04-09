require "test_helper"

class ExpenseItemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @expense_item = expense_items(:one)
  end

  test "should get index" do
    get expense_items_url
    assert_response :success
  end

  test "should get new" do
    get new_expense_item_url
    assert_response :success
  end

  test "should create expense_item" do
    assert_difference("ExpenseItem.count") do
      post expense_items_url, params: { expense_item: { color: @expense_item.color, description: @expense_item.description } }
    end

    assert_redirected_to expense_item_url(ExpenseItem.last)
  end

  test "should show expense_item" do
    get expense_item_url(@expense_item)
    assert_response :success
  end

  test "should get edit" do
    get edit_expense_item_url(@expense_item)
    assert_response :success
  end

  test "should update expense_item" do
    patch expense_item_url(@expense_item), params: { expense_item: { color: @expense_item.color, description: @expense_item.description } }
    assert_redirected_to expense_item_url(@expense_item)
  end

  test "should destroy expense_item" do
    assert_difference("ExpenseItem.count", -1) do
      delete expense_item_url(@expense_item)
    end

    assert_redirected_to expense_items_url
  end
end
